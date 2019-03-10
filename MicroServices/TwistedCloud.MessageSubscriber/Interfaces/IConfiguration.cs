namespace MessageSubscriber.Interfaces
{
    public interface IConfiguration
    {
        string Host { get; set; }
        string Username { get; set; }
        string Password { get; set; }
    }
}