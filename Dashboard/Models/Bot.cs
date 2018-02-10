using MongoDB.Bson.Serialization.Attributes;

namespace Dashboard.Models
{
	[BsonIgnoreExtraElements]
	public class Bot
	{
		public string botName { get; set; }
		public string botAccessToken { get; set; }
	}
}
