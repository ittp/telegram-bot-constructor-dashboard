using System.IO;
using Dashboard.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Xunit;

namespace Tests
{
	public class IntegrationTests
	{
		private readonly Repository _repository;

		public IntegrationTests()
		{
			var configuration = new ConfigurationBuilder()
				.SetBasePath(Directory.GetCurrentDirectory() + "/../../../../Dashboard/")
				.AddJsonFile("appsettings.json")
				.Build();

			_repository = new Repository(
				configuration["Connection:Token"],
				configuration["Connection:DBName"]
			);
		}

		[Fact]
		public void GetBots()
		{
			Assert.NotNull(_repository.GetBots());
		}
	}
}