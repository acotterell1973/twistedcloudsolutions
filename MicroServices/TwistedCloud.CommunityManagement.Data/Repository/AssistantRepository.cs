using System;
using System.Collections.Generic;
using System.ComponentModel;
using TwistedCloud.CommunityManagement.Core.Enum;
using TwistedCloud.CommunityManagement.Core.Model.PersonType;

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
        public string AddNewAssistant(string lastName, string firstName, GenderTypes gender)
        {
            if (string.IsNullOrWhiteSpace(lastName))
            {
                throw new ArgumentException("message", nameof(lastName));
            }

            if (string.IsNullOrWhiteSpace(firstName))
            {
                throw new ArgumentException("message", nameof(firstName));
            }

            if (!Enum.IsDefined(typeof(GenderTypes), gender))
                throw new InvalidEnumArgumentException(nameof(gender), (int)gender, typeof(GenderTypes));


            var assistant = new Assistant
            {
                LastName = lastName,
                FirstName = firstName,
                GenderType = gender,
                
                CreatedOnUtc = DateTime.UtcNow
            };

            _context.Insert(assistant);

      
            return assistant.Id;
        }

        public bool AddAssistantStartDate(Guid personId, DateTime startDate)
        {
            throw new System.NotImplementedException();
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

