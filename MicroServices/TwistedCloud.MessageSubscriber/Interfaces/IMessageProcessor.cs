using MessageSubscriber.Models;

namespace MessageSubscriber.Interfaces
{
    public interface IMessageProcessor
    {
        void Process(Message message);
    }
}
