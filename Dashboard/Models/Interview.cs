using MongoDB.Bson.Serialization.Attributes;

namespace Dashboard.Models
{
	[BsonIgnoreExtraElements]
	public class Interview
	{
		public string InterviewName { get; set; }
		public string Question { get; set; }
		public string AnswerA { get; set; }
		public string AnswerB { get; set; }
		public string BotAccessToken { get; set; }
	}
}