using System.Collections.Generic;
using MongoDB.Bson;

namespace Dashboard.Models
{
	public interface IDBClient
	{
		IEnumerable<BsonDocument> Get(string collectionName);
	}
}