using System;
using System.Collections.Generic;
using System.ComponentModel;
using TwistedCloud.CommunityManagement.Core.Enum;
using TwistedCloud.CommunityManagement.Core.Model.PersonAggregate.PersonType;

namespace TwistedCloud.CommunityManagement.Data.Repository
{
    public class AssistantRepository : PeopleRepositoryBase<CommunityManagementContext<Assistant>>, IDisposable 
    {
        private readonly CommunityManagementContext<Assistant> _context;
        public AssistantRepository(CommunityManagementContext<Assistant> context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<Assistant> GetAllAssistants()
        {
            var result = _context.GetAll();
            return result;
        }
        public string AddNewAssistant(Assistant assistant)
        {
            _context.Insert(assistant);
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

