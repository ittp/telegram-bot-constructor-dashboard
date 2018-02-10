using MongoDB.Bson.Serialization.Attributes;

namespace Dashboard.Models
{
	[BsonIgnoreExtraElements]
	public class OnTextAnswer
	{
		public string MessageText { get; set; }
		public string AnswerText { get; set; }
		public string BotAccessToken { get; set; }
	}
}