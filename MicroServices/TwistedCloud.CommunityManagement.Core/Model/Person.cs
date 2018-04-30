using System;
using MongoDB.Bson.Serialization.Attributes;
using TwistedCloud.CommunityManagement.Core.Enum;

namespace TwistedCloud.CommunityManagement.Core.Model
{
    public abstract class Person : EntityBase
    {
 
        public string FirstName
        {
            get;
            set;
        }

        public string LastName
        {
            get;
            set;
        }

        public virtual string PersonType
        {
            get;
            set;
        }

        public virtual GenderTypes GenderType
        {
            get;
            set;
        }

    }
}

