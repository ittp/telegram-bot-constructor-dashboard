using System.Collections.Generic;
using System.Linq;
using Dashboard.Controllers;
using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;
using Mongo2Go;
using Xunit;

namespace Tests
{
	public class HomeTests
	{
		private MongoDbRunner _fakeDb;
		private Repository _repository;

		public HomeTests()
		{
			_fakeDb = MongoDbRunner.Start();
			_repository = new Repository(_fakeDb.ConnectionString, "TestBase");
		}

		[Fact]
		public void Index()
		{
			Setup();

			var homeController = new HomeController(_repository);
			var bot = CreateBot();
			_repository.AddBot(bot);

			var actionResult = homeController.Index();

			var viewResult = Assert.IsType<ViewResult>(actionResult);
			var viewModel = (List<Bot>) viewResult.Model;
			Assert.NotStrictEqual(bot, viewModel.FirstOrDefault());

			Dispose();
		}

		[Fact]
		public void AddBot()
		{
			Setup();

			var homeController = new HomeController(_repository);

			homeController.AddBot("name", "token");

			Assert.Equal("name", _repository.GetBots().FirstOrDefault()?.BotName);

			Dispose();
		}

		private static Bot CreateBot()
		{
			return new Bot
			{
				BotAccessToken = "token",
				BotName = "name"
			};
		}

		private void Setup()
		{
			_fakeDb = MongoDbRunner.Start();
			_repository = new Repository(_fakeDb.ConnectionString, "TestBase");
		}

		private void Dispose()
		{
			_fakeDb.Dispose();
		}
	}
}