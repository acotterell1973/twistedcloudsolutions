using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TwistedCloud.CommunityManagement.Core.Model
{
    public abstract class EntityBase
	{
	    protected EntityBase()
	    {
	        _id = ObjectId.GenerateNewId().ToString();
	    }

        [BsonId]
	    public string Id
	    {
	        get => _id;
	        set => _id = string.IsNullOrEmpty(value) ? ObjectId.GenerateNewId().ToString() : value;
	    }

	    private string _id;

	    /// <summary>
	    /// Gets or sets the date and time of entity creation
	    /// </summary>
	    public DateTime CreatedOnUtc { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
	    public string UpdatedBy { get; set; }


    }
}

