using TwistedCloud.CommunityManagement.Core.Enum;

namespace TwistedCloud.CommunityManagement.Core.Model.PersonAggregate
{
    public sealed class EmailAddress
	{
		public string Email
		{
			get;
			set;
		}

		public EmailTypes EmailType
		{
			get;
			set;
		}

	}
}

