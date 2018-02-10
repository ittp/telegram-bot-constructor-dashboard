using Dashboard.Models;
using Xunit;

namespace Tests
{
	public class IntegrationTests
	{
		[Fact]
		public void CreateConnectionAndGetBots()
		{
			var dbClient = new DBClient(
				"mongodb://admin:38ea0b9d@ds012058.mlab.com:12058/telegram-bot-constructor",
				"telegram-bot-constructor"
			);
			var repository = new Repository(dbClient);
			var bots = repository.GetBots();
			Assert.NotNull(bots);
		}
	}
}