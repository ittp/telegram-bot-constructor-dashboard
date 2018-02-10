using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Dashboard.Models
{
	[BsonIgnoreExtraElements]
	public class OnTextAnswer
	{
		[BsonElement("_id")]
		public ObjectId Id { get; set; }

		[BsonElement("messageText")]
		public string MessageText { get; set; }

		[BsonElement("answerText")]
		public string AnswerText { get; set; }

		[BsonElement("botAccessToken")]
		public string BotAccessToken { get; set; }
	}
}