using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TwistedCloud.CommunityManagement.Core.Interfaces;
using TwistedCloud.CommunityManagement.Core.Model.PersonAggregate.PersonType;

namespace TwistedCloud.CommunityManagement.Data.Repository
{
    public class AssistantRepository : PeopleRepositoryBase<CommunityManagementContext<Assistant>>, IDisposable, IAssistantRepository
    {
        private readonly CommunityManagementContext<Assistant> _context;
        public AssistantRepository(CommunityManagementContext<Assistant> context) : base(context)
        {
            _context = context;
        }

        public Assistant GetAssistantById(string id)
        {
            var result = _context.GetById(id);
            return result;
        }

        public IEnumerable<Assistant> GetAllAssistants()
        {
            var result = _context.GetAll();
            return result;
        }
        public async Task<string> AddNewAssistantAsync(Assistant assistant)
        {
            await _context.Insert(assistant);
            return assistant.Id;
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}

