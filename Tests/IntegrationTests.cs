using Dashboard.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Xunit;

namespace Tests
{
	public class IntegrationTests
	{
		[Fact]
		public void CreateConnectionAndGetBots()
		{
			const string token = "mongodb://admin:38ea0b9d@ds012058.mlab.com:12058/telegram-bot-constructor";
			const string dbName = "telegram-bot-constructor";
			var repository = new Repository(token, dbName);
			Assert.NotNull(repository.GetBots());
		}
	}
}