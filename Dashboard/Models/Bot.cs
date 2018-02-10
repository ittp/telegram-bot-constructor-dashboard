using MongoDB.Bson.Serialization.Attributes;

namespace Dashboard.Models
{
	[BsonIgnoreExtraElements]
	public class Bot
	{
		public string BotName { get; set; }
		public string BotAccessToken { get; set; }
	}
}
