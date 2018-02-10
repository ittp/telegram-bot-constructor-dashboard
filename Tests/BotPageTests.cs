using System.Linq;
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
			var bot = ModelsFather.CreateBot();
			var onTextAnswer = ModelsFather.CreateOnTextAnswer();

			_repository.AddBot(bot);
			_repository.AddOnTextAnswer(onTextAnswer);

			var actionResult = botPageController.Index(bot.BotAccessToken);

			var viewResult = Assert.IsType<ViewResult>(actionResult);
			var viewModel = (BotPageViewModel) viewResult.Model;
			Assert.NotStrictEqual(bot, viewModel.Bot);
			Assert.NotEmpty(viewModel.OnTextAnswers);
			Dispose();
		}

		[Fact]
		public void RemoveOnTextAnswer()
		{
			Setup();

			var botPageController = new BotPageController(_repository);
			var onTextAnswer = ModelsFather.CreateOnTextAnswer();
			_repository.AddOnTextAnswer(onTextAnswer);

			botPageController.RemoveOnTextAnswer(onTextAnswer.Id.ToString(), "token");

			Assert.Empty(_repository.GetOnTextAnswers());

			Dispose();
		}

		[Fact]
		public void AddOnTextAnswer()
		{
			Setup();

			var botPageController = new BotPageController(_repository);

			botPageController.AddOnTextAnswer("message", "answer", "token");

			Assert.Equal("answer", _repository.GetOnTextAnswers().FirstOrDefault()?.AnswerText);

			Dispose();
		}

		[Fact]
		public void RemoveInlineKey()
		{
			Setup();

			var botPageController = new BotPageController(_repository);
			var inlineKey = ModelsFather.CreateInlineKey();
			_repository.AddInlineKey(inlineKey);

			botPageController.RemoveInlineKey(inlineKey.Id.ToString(), "token");

			Assert.Empty(_repository.GetInlineKeys());

			Dispose();
		}

		[Fact]
		public void AddInlineKey()
		{
			Setup();

			var botPageController = new BotPageController(_repository);

			botPageController.AddInlineKey("answer", "buttonText", "token");

			Assert.Equal("answer", _repository.GetInlineKeys().FirstOrDefault()?.AnswerText);

			Dispose();
		}

		[Fact]
		public void RemoveInterview()
		{
			Setup();

			var botPageController = new BotPageController(_repository);
			var interview = ModelsFather.CreateInterview();
			_repository.AddInterview(interview);

			botPageController.RemoveInterview(interview.Id.ToString(), "token");

			Assert.Empty(_repository.GetInterviews());

			Dispose();
		}

		[Fact]
		public void AddInterView()
		{
			Setup();

			var botPageController = new BotPageController(_repository);

			botPageController.AddInterview("token", "name", "a", "b", "question");

			Assert.Equal("question", _repository.GetInterviews().FirstOrDefault()?.Question);

			Dispose();
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