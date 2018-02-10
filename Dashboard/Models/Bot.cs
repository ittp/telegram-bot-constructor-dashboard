using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Dashboard.Models
{
	[BsonIgnoreExtraElements]
	public class Bot
	{
		[BsonElement("_id")]
		public ObjectId Id { get; set; }

		[BsonElement("botName")]
		public string BotName { get; set; }

		[BsonElement("botAccessToken")]
		public string BotAccessToken { get; set; }
	}
}
