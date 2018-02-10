using System.IO;
using Dashboard.Models;
using Microsoft.Extensions.Configuration;
using Xunit;

namespace Tests
{
	public class IntegrationTests
	{
		private readonly IConfigurationRoot _configuration;

		public IntegrationTests()
		{
			_configuration = new ConfigurationBuilder()
				.SetBasePath(Directory.GetCurrentDirectory() + "/../../../../Dashboard/")
				.AddJsonFile("appsettings.json")
				.Build();
		}

		[Fact]
		public void CreateConnectionAndGetBots()
		{
			var repository = new Repository(_configuration["Connection:Token"], _configuration["Connection:DBName"]);
			Assert.NotNull(repository.GetBots());
		}
	}
}