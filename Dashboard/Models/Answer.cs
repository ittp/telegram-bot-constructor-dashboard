using MongoDB.Bson.Serialization.Attributes;

namespace Dashboard.Models
{
	[BsonIgnoreExtraElements]
	public class Answer
	{
		public string interviewName { get; set; }
		public string answerText { get; set; }
		public string botAccesToken { get; set; }
		public string userName { get; set; }
	}
}
