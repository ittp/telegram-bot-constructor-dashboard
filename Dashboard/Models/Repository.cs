using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Dashboard.Models
{
	public class Repository : IRepository
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

		public IEnumerable<Bot> GetBots() => _botsCollection.Find(new BsonDocument()).ToEnumerable();

		public IEnumerable<Bot> GetBots(Expression<Func<Bot, bool>> predicat) => _botsCollection.Find(predicat).ToEnumerable();

		public IEnumerable<Answer> GetAnswers() => _answersCollection.Find(new BsonDocument()).ToEnumerable();

		public IEnumerable<InlineKey> GetInlineKeys() => _inlineKeysCollection.Find(new BsonDocument()).ToEnumerable();

		public IEnumerable<Interview> GetInterviews() => _interviewsCollection.Find(new BsonDocument()).ToEnumerable();

		public IEnumerable<OnTextAnswer> GetOnTextAnswers() =>
			_onTextAnswersCollection.Find(new BsonDocument()).ToEnumerable();

		public void AddBot(Bot bot) => _botsCollection.InsertOne(bot);
	}
}