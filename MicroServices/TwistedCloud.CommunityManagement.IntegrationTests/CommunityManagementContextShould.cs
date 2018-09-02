using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;
using Ninject;
using TwistedCloud.CommunityManagement.Core.Model.PersonAggregate;
using TwistedCloud.CommunityManagement.Core.Model.PersonAggregate.PersonType;
using TwistedCloud.CommunityManagement.Data.Repository;
using TwistedCloud.CommunityManagement.DependencyRegistrar;
using Xunit;

namespace TwistedCloud.CommunityManagement.IntegrationTests
{
  
    public class CommunityManagementContextShould
    {
        private readonly StandardKernel _kernel;
        public CommunityManagementContextShould()
        {
             _kernel = new StandardKernel(new Registrar());
        }

        [Fact]
        public async Task AddNewAssistant()
        {
            var assistantRepository = _kernel.Get<AssistantRepository>();
            var assistantId = await assistantRepository.AddNewAssistantAsync(new Assistant(){Name = new Name(){ Last = "Cotter", First = "Andrew"}});
            Assert.True(assistantId != string.Empty);

        }
        [Fact]
        public void GetAllAssistants()
        {
            var assistantRepository = _kernel.Get<AssistantRepository>();
            var assistants = assistantRepository.GetAllAssistants();
            Assert.NotEmpty(assistants);

        }
    }
}
