using MessageSubscriber.Interfaces;
// ReSharper disable InconsistentNaming

namespace TwistedCloud.MediaProcessor.Service.Models
{
    public class RabbitMQConfiguration : IConfiguration
    {
        public string Host { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
