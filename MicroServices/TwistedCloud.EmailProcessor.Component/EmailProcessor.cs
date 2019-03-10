using MessageSubscriber.Interfaces;
using MessageSubscriber.Models;

namespace TwistedCloud.EmailProcessor.Component
{
    public class EmailProcessor : IMessageProcessor
    {
        public void Process(Message message)
        {
            var email = new Email("ss","ss","ss");

            Logger.LogInfo("---------------------------------------------------------------");
            Logger.LogInfo($"Email Queue Message received for processing...");
            Logger.LogInfo($"Sending email to {email.ToAddress} with subject {email.Subject}");
            Logger.LogInfo("---------------------------------------------------------------");
        }
    }
}
