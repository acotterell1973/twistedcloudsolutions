using System;
using System.Text;
using RabbitMQ.Client;
using Shared.Kernel;
using TwistedCloud.MessagePublisher.Models;

namespace TwistedCloud.MessagePublisher
{
    class Send
    {
        private static ConnectionFactory _factory;
        private static IConnection _connection;
        private static IModel _channel;
        private static IBasicProperties _properties;


        static void Main(string[] args)
        {
            var emailMessage = new FileDescriptor();

            var queueMessage = CreateMessageForQueuing(emailMessage);

            CreateConnection();
            SendMessage(queueMessage);

            Console.WriteLine(" [x] Sent {0}", queueMessage.SerializeToJson());

            Console.WriteLine(" Press [enter] to exit.");
            Console.ReadLine();
        }



        private static void CreateConnection()
        {
            _factory = new ConnectionFactory { HostName = "docker-server", UserName = "service_user", Password = "5tCwPf6D9bemGkXK" };
            _connection = _factory.CreateConnection();
            _channel = _connection.CreateModel();

            _channel.ExchangeDeclare(Constants.RabbitMQConfigurations.directExchangeName, "direct", true);

            _channel.QueueDeclare(
                queue: Constants.RabbitMQConfigurations.directQueueName,
                durable: false,
                exclusive: false,
                autoDelete: false,
                arguments: null);

            _channel.QueueBind(
                Constants.RabbitMQConfigurations.directQueueName,
                Constants.RabbitMQConfigurations.directExchangeName,
                Constants.RabbitMQConfigurations.directRoutingKeyName);


        }

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

        private static void SendMessage(Message message)
        {
            _properties = _channel.CreateBasicProperties();
            _properties.Persistent = true;

            _channel.BasicPublish(
                exchange: Constants.RabbitMQConfigurations.directExchangeName,
                routingKey: Constants.RabbitMQConfigurations.directRoutingKeyName,
                basicProperties: _properties,
                body: message.SerializeToByteArray());

        }

    }
}
