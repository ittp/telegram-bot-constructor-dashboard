using MongoDB.Bson.Serialization.Attributes;

namespace Dashboard.Models
{
	[BsonIgnoreExtraElements]
	public class InlineKey
	{
		public string buttonText { get; set; }
		public string answerText { get; set; }
		public string botAccessToken { get; set; }
	}
}