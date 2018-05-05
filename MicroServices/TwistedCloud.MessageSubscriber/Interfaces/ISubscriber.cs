namespace MessageSubscriber.Interfaces
{
    public interface ISubscriber
    {
        bool Subscribing { get; set; }
        void Subscribe();
        void UnSubscribe();
    }
}
