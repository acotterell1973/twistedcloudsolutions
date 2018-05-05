using System.Collections.Generic;

namespace TwistedCloud.CommunityManagement.Core.Model.PersonAggregate.PersonType
{
    public sealed class Client<TIdentity> : Person
    {
        public IEnumerable<Address> Address
        {
            get;
            set;
        }

        public IEnumerable<PhoneNumber> PhoneNumber
        {
            get;
            set;
        }

        public IEnumerable<EmailAddress> EmailAddress
        {
            get;
            set;
        }

    }
}

