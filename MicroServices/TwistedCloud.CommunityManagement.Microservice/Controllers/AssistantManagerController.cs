using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using Newtonsoft.Json;
using TwistedCloud.CommunityManagement.Core.Enum;
using TwistedCloud.CommunityManagement.Core.Interfaces;
using TwistedCloud.CommunityManagement.Core.Model.PersonAggregate.PersonType;


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
        [ProducesResponseType(400)]
        public async Task<ActionResult<Assistant>> CreateAsync([FromBody]Assistant assistant)
        {
            string nameOfAction = nameof(GetByIdAsync);
            Debug.Print("--> POST: " + JsonConvert.SerializeObject(assistant));

            var newAssistant =  Assistant.Create(assistant.Name.First,assistant.Name.Last, assistant.GenderType);
           
            await _assistantRepository.AddNewAssistantAsync(newAssistant);
            return CreatedAtAction(nameOfAction, new { id = newAssistant.Id }, newAssistant);
        }


        [HttpPut("{id}")]
        public void Put(string id, [FromBody]Assistant value)
        {
            var assistant = _assistantRepository.GetAssistantById(id);
            _assistantRepository.AddNewAssistantAsync(assistant);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
