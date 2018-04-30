using TwistedCloud.CommunityManagement.Core.Enum;

namespace TwistedCloud.CommunityManagement.Core.Model
{
    public sealed class Address : EntityBase
	{
		public int StreetNumber
		{
			get;
			set;
		}

		public string StreetName
		{
			get;
			set;
		}

		public string ZipCode
		{
			get;
			set;
		}

		public string City
		{
			get;
			set;
		}

		public string UnitNumber
		{
			get;
			set;
		}

		public string State
		{
			get;
			set;
		}

		public AddressTypes AddressType
		{
			get;
			set;
		}

		public AddressSecurity AddressSecurity
		{
			get;
			set;
		}

	}
}

