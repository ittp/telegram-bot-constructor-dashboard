using System.Collections.Generic;
using Dashboard.Models;
using MongoDB.Bson;
using Xunit;

namespace Tests
{
	public class UnitTests
	{
		private Repository _repository;
		private FakeDBClient _fakeDbClient;

		public UnitTests()
		{
			_fakeDbClient = new FakeDBClient();
			_repository = new Repository(_fakeDbClient);
		}

		[Fact]
		public void GetBots()
		{
			var bots = _repository.GetBots();
			Assert.NotEmpty(bots);
		}

		[Fact]
		public void GetAnswers()
		{
			var answers = _repository.GetAnswers();
			Assert.NotEmpty(answers);
		}

		[Fact]
		public void GetInlineKeys()
		{
			var inlineKeys = _repository.GetInlineKeys();
			Assert.NotEmpty(inlineKeys);
		}

		[Fact]
		public void GetInterviews()
		{
			var interviews = _repository.GetInterviews();
			Assert.NotEmpty(interviews);
		}

		[Fact]
		public void GetOnTextAnswers()
		{
			var onTextAnswers = _repository.GetOnTextAnswers();
			Assert.NotEmpty(onTextAnswers);
		}
	}
}