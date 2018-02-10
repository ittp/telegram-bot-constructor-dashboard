using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using Dashboard.Models;
using MongoDB.Bson;
using Xunit;

namespace Tests
{
	public class UnitTests
	{
		private FakeRepository _repository;

		public UnitTests()
		{
			_repository = new FakeRepository();
		}

		[Fact]
		public void AddAndGetBot()
		{
			_repository.AddBot(new Bot
			{
				BotAccessToken = "token",
				BotName = "name"
			});
			Assert.NotEmpty(_repository.GetBots(x => x.BotName == "name"));
		}
	}
}