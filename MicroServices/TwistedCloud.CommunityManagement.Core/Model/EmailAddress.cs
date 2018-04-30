using TwistedCloud.CommunityManagement.Core.Enum;

namespace TwistedCloud.CommunityManagement.Core.Model
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

