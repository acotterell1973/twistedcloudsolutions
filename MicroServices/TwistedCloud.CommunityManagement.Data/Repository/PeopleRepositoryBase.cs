using TwistedCloud.CommunityManagement.Core.Enum;

using TwistedCloud.CommunityManagement.Core.Model;
using TwistedCloud.CommunityManagement.Core.Model.PersonType;

namespace TwistedCloud.CommunityManagement.Data.Repository
{
    public abstract class PeopleRepositoryBase<T>
    {
        private readonly T _context;
        protected PeopleRepositoryBase(T context)
	    {
            _context =  context;
            
        }

	   
        public virtual int AddAddressFor(string personId, Address address)
		{
		    if (typeof(T) == typeof(CommunityManagementContext<Assistant>))
		    {
		        (_context as CommunityManagementContext<Assistant>)?.Insert(new Assistant());
		    }
			throw new System.NotImplementedException();
		}

		public virtual bool AddEmailAddressFor(string personId, EmailTypes emailType, string emailAddress)
		{
			throw new System.NotImplementedException();
		}

		public virtual bool AddPhoneNumberFor(string personId, PhoneTypes phoneType, string phoneNumber)
		{
			throw new System.NotImplementedException();
		}

		public virtual bool AddSecurityInfoForAddress(string addressId, bool requireAlarmCode, AlarmTypes alarmType, string alarmCode, bool requireGateAccess)
		{
			throw new System.NotImplementedException();
		}


	    public virtual void RemovePerson(string personId)
		{
			throw new System.NotImplementedException();
		}

	}
}

