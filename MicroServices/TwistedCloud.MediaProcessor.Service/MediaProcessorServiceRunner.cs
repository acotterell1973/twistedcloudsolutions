using MessageSubscriber.Interfaces;
using Topshelf;

namespace TwistedCloud.MediaProcessor.Service
{
    public class MediaProcessorServiceRunner : ServiceControl
    {
        private readonly ISubscriber _subscriber;
        public MediaProcessorServiceRunner(ISubscriber subscriber)
        {
            _subscriber = subscriber;
        }
        public bool Start(HostControl hostControl)
        {
            Logger.LogInfo($"{this} Service started");
            _subscriber.Subscribe();
            return true;
        }

        public bool Stop(HostControl hostControl)
        {
            Logger.LogInfo("Media Processor Service Service Stopped");
            _subscriber.UnSubscribe();
            return true;
        }
    }
}
