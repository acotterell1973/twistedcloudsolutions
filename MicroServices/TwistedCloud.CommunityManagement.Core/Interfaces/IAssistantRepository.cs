using System.Collections.Generic;
using System.Threading.Tasks;
using TwistedCloud.CommunityManagement.Core.Enum;
using TwistedCloud.CommunityManagement.Core.Model.PersonAggregate;
using TwistedCloud.CommunityManagement.Core.Model.PersonAggregate.PersonType;

namespace TwistedCloud.CommunityManagement.Core.Interfaces
{
    public interface IAssistantRepository
    {
        Assistant GetAssistantById(string id);
        IEnumerable<Assistant> GetAllAssistants();
        Task<string> AddNewAssistantAsync(Assistant assistant);
        void Dispose();
        int AddAddressFor(string personId, Address address);
        bool AddEmailAddressFor(string personId, EmailTypes emailType, string emailAddress);
        bool AddPhoneNumberFor(string personId, PhoneTypes phoneType, string phoneNumber);
        bool AddSecurityInfoForAddress(string addressId, bool requireAlarmCode, AlarmTypes alarmType, string alarmCode, bool requireGateAccess);
        void RemovePerson(string personId);
    }
}