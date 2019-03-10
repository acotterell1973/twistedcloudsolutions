using MessageSubscriber.Interfaces;
using RabbitMQ.Client;
using Shared.Kernel;

namespace MessageSubscriber.Implementations
{
    public class RabbitMqSubscriber : ISubscriber
    {
        private bool _subscribing;
        private static ConnectionFactory _factory;
        private static IConnection _connection;
        private readonly IMessageProcessor _messageProcessor;
        private readonly IConfiguration _configuration;


        public bool Subscribing
        {
            get => _subscribing;
            set => _subscribing = value;
        }

        public RabbitMqSubscriber(IConfiguration configuration, IMessageProcessor messageProcessor)
        {
            _subscribing = true;
            _messageProcessor = messageProcessor;
            _configuration = configuration;
        }

        public void Subscribe()
        {
            ConnectToMessageBroker();

            using (_connection = _factory.CreateConnection())
            {
                using (var channel = _connection.CreateModel())
                {
                    SetupChannel(channel);

                    var consumer = new MessageReceiver(channel, _messageProcessor);
                    channel.BasicConsume(queue: Constants.RabbitMQConfigurations.directQueueName, false, consumer: consumer);
                    Logger.LogInfo("Connected and listening...");

                    while (_subscribing) { }
                }
            }
        }

        private void SetupChannel(IModel channel)
        {
            channel.ExchangeDeclare(
               exchange: Constants.RabbitMQConfigurations.directExchangeName,
               type: "direct",
               durable: true);

            channel.QueueDeclare(
                queue: Constants.RabbitMQConfigurations.directQueueName,
                durable: false,
                exclusive: false,
                autoDelete: false);

            channel.QueueBind(
                Constants.RabbitMQConfigurations.directQueueName,
                Constants.RabbitMQConfigurations.directExchangeName,
                Constants.RabbitMQConfigurations.directRoutingKeyName
                );

            channel.BasicQos(0, 1, false);
        }

        private void ConnectToMessageBroker()
        {
            Logger.LogInfo("Connecting to Message Broker...");
            _factory = new ConnectionFactory
            {
                HostName = _configuration.Host,
                UserName = _configuration.Username,
                Password = _configuration.Password
            };
        }

        public void UnSubscribe()
        {
            _subscribing = false;
        }
    }
}
