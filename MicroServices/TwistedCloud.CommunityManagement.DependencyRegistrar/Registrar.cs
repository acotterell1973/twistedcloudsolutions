using System;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Ninject.Modules;
using TwistedCloud.CommunityManagement.Core;
using TwistedCloud.CommunityManagement.Data.Repository;

namespace TwistedCloud.CommunityManagement.DependencyRegistrar
{
    public class Registrar : NinjectModule
    {
        public override void Load()
        {
            Kernel?.Bind<IMongoClient>().ToMethod(context =>
            {
                Console.WriteLine("Getting Mongo Client");
                return new MongoClient("mongodb://127.0.0.1:28000");
            });
            Kernel?.Bind<ServiceConfigurationSettings>().ToMethod(context =>
            {

                Console.WriteLine("Getting Cofig Settings");
                var config = new ConfigurationBuilder()
                    .AddJsonFile("AppSettings.json")
                    .Build();

                var serviceConfigurationSettings = config.GetSection("Service").Get<ServiceConfigurationSettings>();

                return serviceConfigurationSettings;
            });

            Kernel?.Bind(typeof(AssistantRepository)).To(typeof(AssistantRepository)).InSingletonScope();
            ////   kernel.Bind(typeof(IClientManagementRepository)).To(typeof(ClientManagementRepository<,>));
        }
    }
}
