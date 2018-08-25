using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using MongoDB.Bson.Serialization.IdGenerators;
using Shared.Kernel;
using TwistedCloud.CommunityManagement.Core.Enum;

namespace TwistedCloud.CommunityManagement.Core.Model.PersonAggregate.PersonType
{
    public sealed class Assistant : Person
    {
        public DateTime? StartWorkDate { get; private set; }

        public DateTime? EndWorkDate { get; private set; }

        public IEnumerable<EmailAddress> EmailAddress { get; set; }

        public PhoneNumber PhoneNumber { get; set; }

        public IEnumerable<Location> Address { get; set; }

        public static Assistant Create(string lastName, string firstName, GenderTypes gender)
        {
            Guard.ForNullOrEmpty(lastName, nameof(lastName));
            Guard.ForNullOrEmpty(lastName, nameof(firstName));
            Guard.ForInvalidEnum<GenderTypes>((int) gender);
         
            var assistant = new Assistant
            {
                Name = new Name {First = firstName, Last = lastName} ,
                GenderType = gender,
                Address = new List<Location>(),
                EmailAddress = new List<EmailAddress>(),
                CreatedOnUtc = DateTime.UtcNow,
                UpdatedOnUtc = DateTime.UtcNow
            };
            return assistant;
        }

        public Location GetAddress(AddressTypes addressType)
        {
            var address = Address.FirstOrDefault(addr => addr.AddressType.Equals(addressType));
            return address;
        }

        public EmailAddress GetEmailAddress(EmailTypes emailType)
        {
            var emailAddress = EmailAddress.FirstOrDefault(email => email.EmailType.Equals(emailType));
            return emailAddress;
        }

        public void SetWorkStartDate(DateTime startDate)
        {
            StartWorkDate = startDate;
        }

        public void SetWorkEndDate(DateTime endDate)
        {
            EndWorkDate = endDate;
        }
    }
}

