using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Dashboard.Models
{
	public class DBClient : IDBClient
	{
		private MongoClient _client;
		private IMongoDatabase _database;

		public DBClient(string token, string dbName)
		{
			_client = new MongoClient(token);
			_database = _client.GetDatabase(dbName);
		}

		public IEnumerable<BsonDocument> Get(string collectionName)
		{
			var query = new BsonDocument();
			var collection = _database.GetCollection<BsonDocument>(collectionName);
			var data = collection.Find(query).ToEnumerable();
			return data;
		}
	}
}