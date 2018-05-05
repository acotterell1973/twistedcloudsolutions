namespace TwistedCloud.CommunityManagement.Core
{
    public class ServiceConfigurationSettings
    {
        public Connection Connection { get; set; }
        public Profile Profile { get; set; }
    }



    public class Connection
    {
        public string MongoDatabaseConnectionString { get; set; }
    }

    public class Profile
    {
        public string Database { get; set; }
    }
}
