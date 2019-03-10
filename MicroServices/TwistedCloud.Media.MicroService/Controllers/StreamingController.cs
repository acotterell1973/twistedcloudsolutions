using System;
using System.Globalization;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using RabbitMQ.Client;
using Shared.Kernel;
using Shared.Kernel.QueueModels;
using TwistedCloud.Media.MicroService.Filters;
using TwistedCloud.Media.MicroService.Helpers;
using TwistedCloud.Media.MicroService.Models;

namespace TwistedCloud.Media.MicroService.Controllers
{
    [Produces("application/json")]
    [Route("api/stream")]
    // [Authorize]
    public class StreamingController : ControllerBase
    {

        private static readonly FormOptions DefaultFormOptions = new FormOptions();
        private  ILogger<StreamingController> Logger { get; }
        private  IHostingEnvironment Environment { get; }
        private  IConfiguration Configuration { get; }

        public StreamingController(IHostingEnvironment environment, ILogger<StreamingController> logger, IConfiguration configuration)
        {
            Environment = environment ?? throw new ArgumentNullException(nameof(environment));
            Logger = logger;
            Configuration = configuration;
        }

        [HttpPost]
        [DisableFormValueModelBinding]
        [AllowAnonymous]
        public async Task<IActionResult> Upload()
        {
            if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
            {
                return BadRequest($"Expected a multipart request, but got {Request.ContentType}");
            }

            // Used to accumulate all the form url encoded key value pairs in the request.
            var boundary = MultipartRequestHelper.GetBoundary(
                MediaTypeHeaderValue.Parse(Request.ContentType),
                DefaultFormOptions.MultipartBoundaryLengthLimit);


            var reader = new MultipartReader(boundary, HttpContext.Request.Body);
            var targetFilePath = Path.GetTempFileName();  //Change to a know network share

            var formAccumulator = await SaveStream(reader, targetFilePath);



            // Bind form data to a model
            var formValueProvider = new FormValueProvider(
                BindingSource.Form,
                new FormCollection(formAccumulator.GetResults()),
                CultureInfo.CurrentCulture);

            var user = new User();
            var bindingSuccessful = await TryUpdateModelAsync(user, prefix: "", valueProvider: formValueProvider);
            if (!bindingSuccessful)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
            }

            //Prepare the file info to send to the queue for processing
            var fileDescriptor = new FileDescriptor {FilePath = targetFilePath};

            var queueMessage = CreateMessageForQueuing(fileDescriptor);

            using (var connection = ConnectToMessageBroker().CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    SetupChannel(channel);
                    SendMessage(channel, queueMessage);
                }
            }

            var uploadedData = new
            {
                Name = user.Name,
                Age = user.Age,
                Zipcode = user.Zipcode,
                FilePath = targetFilePath
            };

            return new JsonResult(uploadedData);
        }

        private async Task<KeyValueAccumulator> SaveStream(MultipartReader reader, string targetFilePath)
        {
            MultipartSection section = await reader.ReadNextSectionAsync();
            var formAccumulator = new KeyValueAccumulator();
            while (section != null)
            {
                var hasContentDispositionHeader = ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out var contentDisposition);

                if (hasContentDispositionHeader)
                {
                    if (MultipartRequestHelper.HasFileContentDisposition(contentDisposition))
                    {

                        using (var targetStream = System.IO.File.Create(targetFilePath))
                        {
                            await section.Body.CopyToAsync(targetStream);

                            Logger.LogInformation($"Copied the uploaded file '{targetFilePath}'");
                        }
                    }
                    else if (MultipartRequestHelper.HasFormDataContentDisposition(contentDisposition))
                    {
                        // Content-Disposition: form-data; name="key"
                        // value

                        // Do not limit the key name length here because the 
                        // multipart headers length limit is already in effect.
                        var key = HeaderUtilities.RemoveQuotes(contentDisposition.Name);
                        var encoding = GetEncoding(section);
                        using (var streamReader = new StreamReader(
                            section.Body,
                            encoding,
                            detectEncodingFromByteOrderMarks: true,
                            bufferSize: 1024,
                            leaveOpen: true))
                        {
                            // The value length limit is enforced by MultipartBodyLengthLimit
                            var value = await streamReader.ReadToEndAsync();
                            if (string.Equals(value, "undefined", StringComparison.OrdinalIgnoreCase))
                            {
                                value = string.Empty;
                            }
                            formAccumulator.Append(key.Value, value);

                            if (formAccumulator.ValueCount > DefaultFormOptions.ValueCountLimit)
                            {
                                throw new InvalidDataException($"Form key count limit {DefaultFormOptions.ValueCountLimit} exceeded.");
                            }
                        }
                    }
                }

                // Drains any remaining section body that has not been consumed and
                // reads the headers for the next section.
                section = await reader.ReadNextSectionAsync();
            }

            return formAccumulator;
        }

        private static Encoding GetEncoding(MultipartSection section)
        {
            MediaTypeHeaderValue mediaType;
            var hasMediaTypeHeader = MediaTypeHeaderValue.TryParse(section.ContentType, out mediaType);
            // UTF-7 is insecure and should not be honored. UTF-8 will succeed in 
            // most cases.
            if (!hasMediaTypeHeader || Encoding.UTF7.Equals(mediaType.Encoding))
            {
                return Encoding.UTF8;
            }
            return mediaType.Encoding;
        }

        /// <summary>
        /// Connect to RabbitMQ
        /// </summary>
        /// <returns></returns>
        private ConnectionFactory ConnectToMessageBroker()
        {
            var rabbitMqConfig = Configuration.GetSection("rabbitmq").Get<RabbitMQConfiguration>();

            Shared.Kernel.Logger.LogInfo("Connecting to Message Broker...");
            var factory = new ConnectionFactory
            {
                HostName = rabbitMqConfig.Host,
                UserName = rabbitMqConfig.Username,
                Password = rabbitMqConfig.Password
            };
            return factory;
        }

        /// <summary>
        /// Define Queue Exchange and Queue
        /// </summary>
        /// <param name="channel"></param>
        private static void SetupChannel(IModel channel)
        {
            channel.ExchangeDeclare(Constants.RabbitMQConfigurations.directExchangeName, "direct", true);

            channel.QueueDeclare(
                queue: Constants.RabbitMQConfigurations.directQueueName,
                durable: false,
                exclusive: false,
                autoDelete: false,
                arguments: null);

            channel.QueueBind(
                Constants.RabbitMQConfigurations.directQueueName,
                Constants.RabbitMQConfigurations.directExchangeName,
                Constants.RabbitMQConfigurations.directRoutingKeyName);

        }

        /// <summary>
        /// Prepare the user data in a structured queue message
        /// </summary>
        /// <param name="fileDescriptor"></param>
        /// <returns></returns>
        private static Message CreateMessageForQueuing(FileDescriptor fileDescriptor)
        {
            return new Message
            {
                Id = Guid.NewGuid(),
                CorrelationId = Guid.NewGuid(),
                DataType = typeof(FileDescriptor).ToString(),
                Data = fileDescriptor.SerializeToJson(),
                SentDateTime = DateTime.UtcNow,
                Sender = "domain.com",
                ExpirationDateTime = DateTime.UtcNow.AddMinutes(10),
                Retries = 1
            };
        }

        /// <summary>
        /// Send message to Queue
        /// </summary>
        /// <param name="channel"></param>
        /// <param name="message"></param>
        private static void SendMessage(IModel channel, Message message)
        {
            var properties = channel.CreateBasicProperties();
            properties.Persistent = true;

            channel.BasicPublish(
                exchange: Constants.RabbitMQConfigurations.directExchangeName,
                routingKey: Constants.RabbitMQConfigurations.directRoutingKeyName,
                basicProperties: properties,
                body: message.SerializeToByteArray());

        }
    }
}