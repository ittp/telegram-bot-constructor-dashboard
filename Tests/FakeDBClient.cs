using System;
using System.Collections.Generic;
using Dashboard.Models;
using MongoDB.Bson;

namespace Tests
{
	public class FakeDBClient : IDBClient
	{
		private IEnumerable<BsonDocument> bots;
		private IEnumerable<BsonDocument> answers;
		private IEnumerable<BsonDocument> onTextAnswers;
		private IEnumerable<BsonDocument> inlineKeys;
		private IEnumerable<BsonDocument> interviews;

		public FakeDBClient()
		{
			bots = new List<BsonDocument>
			{
				BsonDocument.Parse(
					" { \"botName\" : \"Dev-Hackaton-1\", " +
					" \"botAccessToken\" : \"531672624:AAHz5TO4qKY4P6Jg3aMJm8Vmm6cjLPqWPvg\" } "
				)
			};
			interviews = new List<BsonDocument>
			{
				BsonDocument.Parse(
				" {	\"interviewName\" : \"Social interview\", " +
				" \"question\" : \"Are you a programmer?\", " +
				" \"answerA\" : \"yes\", " +
				" \"answerB\" : \"no\", " +
				" \"botAccessToken\" : \"531672624:AAHz5TO4qKY4P6Jg3aMJm8Vmm6cjLPqWPvg\", } "
				)
			};
			inlineKeys = new List<BsonDocument>
			{
				BsonDocument.Parse(
					" { \"buttonText\" : \"About constructor\", " +
					" \"answerText\" : \"http://telegra.ph/Telegram-Bot-Constructor-02-05\", " +
					" \"botAccessToken\" : \"531672624:AAHz5TO4qKY4P6Jg3aMJm8Vmm6cjLPqWPvg\" } "
				)
			};
			answers = new List<BsonDocument>
			{
				BsonDocument.Parse(
					" {	\"interviewName\" : \"Social interview\", " +
					" \"answerText\" : \"yes\", " +
					" \"botAccessToken\" : \"531672624:AAHz5TO4qKY4P6Jg3aMJm8Vmm6cjLPqWPvg\", " +
					" \"userName\" : \"Sergey Bukharov\" } "
				)
			};
			onTextAnswers = new List<BsonDocument>
			{
				BsonDocument.Parse(
					"	{ \"messageText\" : \"hello\", " +
					" \"answerText\" : \"Hello from bot constructor!\", " +
					" \"botAccessToken\" : \"531672624:AAHz5TO4qKY4P6Jg3aMJm8Vmm6cjLPqWPvg\" } "
				)
			};
		}

		public IEnumerable<BsonDocument> Get(string collectionName)
		{
			switch (collectionName)
			{
				case "bots":
					return bots;
				case "answers":
					return answers;
				case "ontextanswers":
					return onTextAnswers;
				case "inlinekeys":
					return inlineKeys;
				case "interviews":
					return interviews;
			}

			throw new ArgumentException();
		}
	}
}