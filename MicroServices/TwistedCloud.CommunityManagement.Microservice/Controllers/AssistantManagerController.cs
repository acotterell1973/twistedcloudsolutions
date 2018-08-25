using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TwistedCloud.CommunityManagement.Core.Interfaces;
using TwistedCloud.CommunityManagement.Core.Model.PersonAggregate.PersonType;
using TwistedCloud.CommunityManagement.Data.Repository;


namespace TwistedCloud.CommunityManagement.Microservice.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class AssistantManagerController : ControllerBase
    {
        private readonly IAssistantRepository _assistantRepository;
        public AssistantManagerController(IAssistantRepository assistantRepository)
        {
            _assistantRepository = assistantRepository;
        }
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Assistant> Get()
        {
            var assistant = _assistantRepository.GetAllAssistants();
            return assistant;
        }

     
        [HttpGet("{id}")]
        [ProducesResponseType(404)]
        public async Task<Assistant> GetByIdAsync(string id)
        {
            var assistant = _assistantRepository.GetAssistantById(id);
            return assistant;
        }

      
        [HttpPost]
        public void Post([FromBody]Assistant value)
        {
        }

     
        [HttpPut("{id}")]
        public void Put(string id, [FromBody]Assistant value)
        {
            var assistant = _assistantRepository.GetAssistantById(id);
            _assistantRepository.AddNewAssistant(assistant);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
