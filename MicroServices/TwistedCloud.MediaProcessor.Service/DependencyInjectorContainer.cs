using Autofac;
using MessageSubscriber.Implementations;
using MessageSubscriber.Interfaces;
using TwistedCloud.MediaProcessor.Service.Models;

namespace TwistedCloud.MediaProcessor.Service
{
    // ReSharper disable once InconsistentNaming
    public class DependencyInjectorContainer
    {
        public static IContainer Setup(RabbitMQConfiguration rabbitMqConfiguration)
        {
            var builder = new ContainerBuilder();
            builder.RegisterInstance(rabbitMqConfiguration).As<IConfiguration>().ExternallyOwned();
            builder.RegisterType<RabbitMqSubscriber>().As<ISubscriber>();
            builder.RegisterType<VideoProcessor.Component.VideoProcessor>().As<IMessageProcessor>();
            builder.RegisterType<MediaProcessorServiceRunner>();
            var container = builder.Build();
            return container;
        }
    }
}
