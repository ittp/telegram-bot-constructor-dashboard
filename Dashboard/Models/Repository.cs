using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.CompilerServices;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace Dashboard.Models
{
	public class Repository
	{
		private readonly IMongoCollection<Bot> _botsCollection;
		private readonly IMongoCollection<Answer> _answersCollection;
		private readonly IMongoCollection<InlineKey> _inlineKeysCollection;
		private readonly IMongoCollection<Interview> _interviewsCollection;
		private readonly IMongoCollection<OnTextAnswer> _onTextAnswersCollection;

		public Repository(string token, string dbName)
		{
			var database = new MongoClient(token).GetDatabase(dbName);
			_botsCollection = database.GetCollection<Bot>("bots");
			_answersCollection = database.GetCollection<Answer>("answers");
			_inlineKeysCollection = database.GetCollection<InlineKey>("inlinekeys");
			_interviewsCollection = database.GetCollection<Interview>("interviews");
			_onTextAnswersCollection = database.GetCollection<OnTextAnswer>("ontextanswers");
		}

		public IEnumerable<Bot> GetBots()
		{
			return _botsCollection.Find(new BsonDocument()).ToList();
		}

		public IEnumerable<Bot> GetBots(Expression<Func<Bot, bool>> predicat)
		{
			return _botsCollection.Find(predicat).ToList();
		}

		public Bot GetBotByToken(string token)
		{
			return GetBots(x => x.BotAccessToken == token).FirstOrDefault();
		}

		public void AddBot(Bot bot)
		{
			_botsCollection.InsertOne(bot);
		}

		public IEnumerable<Answer> GetAnswers()
		{
			return _answersCollection.Find(new BsonDocument()).ToEnumerable();
		}

		public void AddAnswer(Answer answer)
		{
			_answersCollection.InsertOne(answer);
		}

		public void RemoveAnswer(string id)
		{
			ValidateStringParam(id);
			_answersCollection.DeleteOne(x => x.Id == new ObjectId(id));
		}

		public IEnumerable<InlineKey> GetInlineKeys()
		{
			return _inlineKeysCollection.Find(new BsonDocument()).ToEnumerable();
		}

		public void AddInlineKey(InlineKey inlineKey)
		{
			_inlineKeysCollection.InsertOne(inlineKey);
		}

		public void RemoveInlineKey(string id)
		{
			ValidateStringParam(id);
			_inlineKeysCollection.DeleteOne(x => x.Id == new ObjectId(id));
		}

		public IEnumerable<Interview> GetInterviews()
		{
			return _interviewsCollection.Find(new BsonDocument()).ToEnumerable();
		}

		public void AddInterview(Interview interview)
		{
			_interviewsCollection.InsertOne(interview);
		}

		public void RemoveInterview(string id)
		{
			ValidateStringParam(id);
			_interviewsCollection.DeleteOne(x => x.Id == new ObjectId(id));
		}

		public IEnumerable<OnTextAnswer> GetOnTextAnswers()
		{
			return _onTextAnswersCollection.Find(new BsonDocument()).ToEnumerable();
		}

		public void AddOnTextAnswer(OnTextAnswer onTextAnswer)
		{
			_onTextAnswersCollection.InsertOne(onTextAnswer);
		}

		public void RemoveOnTextAnswer(string id)
		{
			ValidateStringParam(id);
			_onTextAnswersCollection.DeleteOne(x => x.Id == new ObjectId(id));
		}

		private static void ValidateStringParam(string param)
		{
			if (param.Contains("{") || param.Contains("}"))
			{
				throw new Exception("Non-Secure Param");
			}
		}
	}
}