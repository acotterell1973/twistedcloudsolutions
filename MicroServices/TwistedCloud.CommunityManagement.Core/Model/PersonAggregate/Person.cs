using Shared.Kernel.Enum;
using TwistedCloud.CommunityManagement.Core.Enum;
using TwistedCloud.CommunityManagement.Core.Model.PersonAggregate.PersonType;

namespace TwistedCloud.CommunityManagement.Core.Model.PersonAggregate
{
    public abstract class Person : EntityBase
    {

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PersonType { get; set; }

        public GenderTypes GenderType { get; set; }

        public TrackingState State { get; set; }
    }
}

