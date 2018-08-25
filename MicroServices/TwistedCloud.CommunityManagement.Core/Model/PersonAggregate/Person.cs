using Shared.Kernel.Enum;
using TwistedCloud.CommunityManagement.Core.Enum;

namespace TwistedCloud.CommunityManagement.Core.Model.PersonAggregate
{
    public abstract class Person : EntityBase
    {
        public Name Name { get; set; }
        public Dob Dob { get; set; }
        public string Nationality { get; set; }
        public GenderTypes GenderType { get; set; }
        public TrackingState State { get; set; }
    }
}

