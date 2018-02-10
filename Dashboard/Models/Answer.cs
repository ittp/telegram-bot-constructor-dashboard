using System;
using System.Data.Common;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Dashboard.Models
{
	[BsonIgnoreExtraElements]
	public class Answer
	{
		[BsonElement("_id")]
		public ObjectId Id { get; set; }

		[BsonElement("interviewName")]
		public string InterviewName { get; set; }

		[BsonElement("answerText")]
		public string AnswerText { get; set; }

		[BsonElement("botAccessToken")]
		public string BotAccessToken { get; set; }

		[BsonElement("userName")]
		public string UserName { get; set; }
	}
}
