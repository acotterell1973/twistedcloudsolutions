using System.Collections.Generic;

namespace TwistedCloud.CommunityManagement.Core.Model.PersonAggregate.PersonType
{
    public sealed class Client<TIdentity> : Person
    {
        public IEnumerable<Location> Locations{get;set;}
        public IEnumerable<PhoneNumber> PhoneNumber{get;set;}
        public IEnumerable<EmailAddress> EmailAddress{get;set;}

        public Registered Registered { get; set; }
        public Login Login { get; set; }
        public CountryIdentifier CountryIdentifier { get; set; }
        public Picture Picture { get; set; }

    }
}

