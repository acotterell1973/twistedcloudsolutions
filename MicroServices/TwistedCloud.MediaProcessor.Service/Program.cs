using System;
using System.IO;
using Autofac;
using Microsoft.Extensions.Configuration;
using Topshelf;
using Topshelf.Autofac;
using TwistedCloud.MediaProcessor.Service.Models;


namespace TwistedCloud.MediaProcessor.Service
{
    class Program
    {
        static void Main(string[] args)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);


            var config = builder.Build();
            var rabbitMqConfig = config.GetSection("rabbitmq").Get<RabbitMQConfiguration>();
            
            var scope = DependencyInjectorContainer.Setup(rabbitMqConfig);

            
            
            HostFactory.Run(host =>
            {
                host.UseAutofacContainer(scope);
                host.Service<MediaProcessorServiceRunner>(service =>
                {
                    service.ConstructUsingAutofacContainer();
                    service.WhenStarted((emailService, hostControl) => emailService.Start(hostControl));
                    service.WhenStopped((emailService, hostControl) => emailService.Stop(hostControl));
                });
                host.RunAsLocalSystem();
                host.SetDisplayName("TwistedCloud Media Processor Service");
                host.SetDescription("TwistedCloud Media Processor");
                host.SetServiceName("MediaProcessorService-Instance");
                host.OnException(Logger.LogError);

            });

            Console.WriteLine();
        }
    }
}
