using System;
using System.Text;
using MessageSubscriber.Interfaces;
using MessageSubscriber.Models;
using RabbitMQ.Client;

namespace MessageSubscriber.Implementations
{
    public class MessageReceiver : DefaultBasicConsumer
    {
        private readonly IModel _channel;
        private readonly IMessageProcessor _messageProcessor;
        public MessageReceiver(IModel channel, IMessageProcessor messageProcessor)
        {
            _channel = channel;
            _messageProcessor = messageProcessor;
        }

        public override void HandleBasicDeliver(string consumerTag, ulong deliveryTag, bool redelivered, string exchange, string routingKey, IBasicProperties properties, byte[] body)
        {
            Logger.LogInfo($"Consuming Message");
            Logger.LogInfo(string.Concat("Message received from the exchange ", exchange));
            Logger.LogInfo(string.Concat("Consumer tag: ", consumerTag));
            Logger.LogInfo(string.Concat("Delivery tag: ", deliveryTag));
            Logger.LogInfo(string.Concat("Routing tag: ", routingKey));
            Logger.LogInfo(string.Concat("Message: ", Encoding.UTF8.GetString(body)));
            var message = (Message)body.DeSerializeFromByteArray(typeof(Message));
            try
            {
                _messageProcessor.Process(message);
                _channel.BasicAck(deliveryTag, false);
            }
            catch (Exception e)
            {
                Logger.LogError(e);
                _channel.BasicNack(deliveryTag, false, true);
            }
        }

    }
}