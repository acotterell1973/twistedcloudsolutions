using System;
using System.Collections.Generic;

namespace TwistedCloud.CommunityManagement.Core.Model.PersonType
{
    public sealed class Assistant : Person
    {
		public DateTime? StartWorkDate
		{
			get;
			set;
		}

		public DateTime? EndWorkDate
		{
			get;
			set;
		}

		public IEnumerable<EmailAddress> EmailAddress
		{
			get;
			set;
		}

		public PhoneNumber PhoneNumber
		{
			get;
			set;
		}

		public IEnumerable<Address> Address
		{
			get;
			set;
		}

	}
}

