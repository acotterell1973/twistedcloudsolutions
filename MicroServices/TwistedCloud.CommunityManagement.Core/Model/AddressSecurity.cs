using TwistedCloud.CommunityManagement.Core.Enum;

namespace TwistedCloud.CommunityManagement.Core.Model
{
    public sealed class AddressSecurity
	{
		public bool RequireGateAccess
		{
			get;
			set;
		}

		public bool ReguireAlarmCode
		{
			get;
			set;
		}

		public string AlarmCode
		{
			get;
			set;
		}

		public AlarmTypes AlarmType
		{
			get;
			set;
		}

	}
}

