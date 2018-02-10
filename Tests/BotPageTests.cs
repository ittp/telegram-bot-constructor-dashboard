using Dashboard.Controllers;
using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;
using Mongo2Go;
using Xunit;

namespace Tests
{
	public class BotPageTests
	{
		private MongoDbRunner _fakeDb;
		private Repository _repository;

		public BotPageTests()
		{
			_fakeDb = MongoDbRunner.Start();
			_repository = new Repository(_fakeDb.ConnectionString, "TestBase");
		}

		[Fact]
		public void Index()
		{
			Setup();

			var botPageController = new BotPageController(_repository);
			var bot = CreateBot();
			var answer = CreateAnswer();
			_repository.AddBot(bot);
			_repository.AddAnswer(answer);

			var actionResult = botPageController.Index(bot.BotAccessToken);

			var viewResult = Assert.IsType<ViewResult>(actionResult);
			var viewModel = (BotPageViewModel) viewResult.Model;
			Assert.NotStrictEqual(bot, viewModel.Bot);
			Assert.NotEmpty(viewModel.Answers);

			Dispose();
		}

		[Fact]
		public void RemoveAnswer()
		{
			var botPageController = new BotPageController(_repository);
			var answer = CreateAnswer();
			_repository.AddAnswer(answer);

			botPageController.RemoveAnswer(answer.Id.ToString(), "token");

			Assert.Empty(_repository.GetAnswers());
		}

		private static Bot CreateBot()
		{
			return new Bot
			{
				BotAccessToken = "token",
				BotName = "name"
			};
		}

		private static Answer CreateAnswer()
		{
			return new Answer
			{
				AnswerText = "text",
				BotAccessToken = "token",
				InterviewName = "interview",
				UserName = "user"
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