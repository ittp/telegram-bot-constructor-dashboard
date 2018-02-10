using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;

namespace Dashboard.Models
{
	public class Repository
	{
		private IDBClient _dbClient;

		public Repository(IDBClient dbClient)
		{
			_dbClient = dbClient;
		}

		public IEnumerable<Bot> GetBots()
		{
			var data = _dbClient.Get("bots");
			var mappedData = data.Select(MapToBot);
			return mappedData;
		}

		public IEnumerable<Answer> GetAnswers()
		{
			var data = _dbClient.Get("answers");
			var mappedData = data.Select(MapToAnswer);
			return mappedData;
		}

		public IEnumerable<InlineKey> GetInlineKeys()
		{
			var data = _dbClient.Get("inlinekeys");
			var mappedData = data.Select(MapToInlineKey);
			return mappedData;
		}

		public IEnumerable<Interview> GetInterviews()
		{
			var data = _dbClient.Get("interviews");
			var mappedData = data.Select(MapToInterview);
			return mappedData;
		}

		public IEnumerable<OnTextAnswer> GetOnTextAnswers()
		{
			var data = _dbClient.Get("ontextanswers");
			var mappedData = data.Select(MapToOnTextAnswer);
			return mappedData;
		}

		private static Interview MapToInterview(BsonDocument dto)
		{
			var question = dto["question"].ToString();
			var botAccessToken = dto["botAccessToken"].ToString();
			var answerA = dto["answerA"].ToString();
			var answerB = dto["answerB"].ToString();
			var interviewName = dto["interviewName"].ToString();
			return new Interview
			{
				question = question,
				botAccessToken = botAccessToken,
				answerA = answerA,
				answerB = answerB,
				interviewName = interviewName
			};
		}

		private static InlineKey MapToInlineKey(BsonDocument dto)
		{
			var answerText = dto["answerText"].ToString();
			var botAccessToken = dto["botAccessToken"].ToString();
			var buttonText = dto["buttonText"].ToString();
			return new InlineKey
			{
				answerText = answerText,
				botAccessToken = botAccessToken,
				buttonText = buttonText
			};
		}

		private static Bot MapToBot(BsonDocument dto)
		{
			var botAccessToken = dto["botAccessToken"].ToString();
			var botName = dto["botName"].ToString();
			return new Bot
			{
				botAccessToken = botAccessToken,
				botName = botName
			};
		}

		private static OnTextAnswer MapToOnTextAnswer(BsonDocument dto)
		{
			var answerText = dto["answerText"].ToString();
			var botAccessToken = dto["botAccessToken"].ToString();
			var messageText = dto["messageText"].ToString();
			return new OnTextAnswer
			{
				answerText = answerText,
				botAccessToken = botAccessToken,
				messageText = messageText
			};
		}

		private static Answer MapToAnswer(BsonDocument dto)
		{
			var answerText = dto["answerText"].ToString();
			var botAccesToken = dto["botAccessToken"].ToString();
			var interviewName = dto["interviewName"].ToString();
			var userName = dto["userName"].ToString();
			return new Answer
			{
				answerText = answerText,
				botAccesToken = botAccesToken,
				interviewName = interviewName,
				userName = userName
			};
		}
	}
}