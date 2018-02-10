using MongoDB.Bson.Serialization.Attributes;

namespace Dashboard.Models
{
	[BsonIgnoreExtraElements]
	public class InlineKey
	{
		public string ButtonText { get; set; }
		public string AnswerText { get; set; }
		public string BotAccessToken { get; set; }
	}
}