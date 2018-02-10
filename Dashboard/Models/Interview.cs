using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Dashboard.Models
{
	[BsonIgnoreExtraElements]
	public class Interview
	{
		[BsonElement("_id")]
		public ObjectId Id { get; set; }

		[BsonElement("interviewName")]
		public string InterviewName { get; set; }

		[BsonElement("question")]
		public string Question { get; set; }

		[BsonElement("answerA")]
		public string AnswerA { get; set; }

		[BsonElement("answerB")]
		public string AnswerB { get; set; }

		[BsonElement("botAccessToken")]
		public string BotAccessToken { get; set; }
	}
}