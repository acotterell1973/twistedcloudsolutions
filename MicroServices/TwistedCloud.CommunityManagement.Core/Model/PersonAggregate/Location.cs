using TwistedCloud.CommunityManagement.Core.Enum;

namespace TwistedCloud.CommunityManagement.Core.Model.PersonAggregate
{
    public class Location : EntityBase
    {
        public int StreetNumber{get;set;}

        public string StreetName{get;set;}
        public string UnitNumber{get;set;}

        public string City { get; set; }
        public string State { get; set; }
        public int Postcode { get; set; }
        public Coordinates Coordinates { get; set; }
        public Timezone Timezone { get; set; }

        public AddressTypes AddressType { get;set;}

        public AddressSecurity AddressSecurity{get;set;}
    }
}