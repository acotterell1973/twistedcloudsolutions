using TwistedCloud.CommunityManagement.Core.Enum;

namespace TwistedCloud.CommunityManagement.Core.Model.PersonAggregate
{
    public sealed class PhoneNumber
	{
		public string Number
		{
			get;
			set;
		}

		public PhoneTypes PhoneType
		{
			get;
			set;
		}

	}
}

