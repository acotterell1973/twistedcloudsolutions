using System;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Ninject.Modules;
using TwistedCloud.CommunityManagement.Core;
using TwistedCloud.CommunityManagement.Core.Interfaces;
using TwistedCloud.CommunityManagement.Data.Repository;

namespace TwistedCloud.CommunityManagement.DependencyRegistrar
{
    public class Registrar : NinjectModule
    {
        public override void Load()
        {
            Console.WriteLine("Getting Cofig Settings");
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            var serviceConfigurationSettings = config.GetSection("Service").Get<ServiceConfigurationSettings>();

            Kernel?.Bind<IMongoClient>().ToMethod(context =>
            {
                Console.WriteLine("Getting Mongo Client");
                
                return new MongoClient(serviceConfigurationSettings.Connection.MongoDatabaseConnectionString);
            });
            Kernel?.Bind<ServiceConfigurationSettings>().ToMethod(context => serviceConfigurationSettings);

            Kernel?.Bind(typeof(IAssistantRepository)).To(typeof(AssistantRepository)).InSingletonScope();
          
        }
    }
}
