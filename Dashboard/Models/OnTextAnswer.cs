using MongoDB.Bson.Serialization.Attributes;

namespace Dashboard.Models
{
	[BsonIgnoreExtraElements]
	public class OnTextAnswer
	{
		public string messageText { get; set; }
		public string answerText { get; set; }
		public string botAccessToken { get; set; }
	}
}