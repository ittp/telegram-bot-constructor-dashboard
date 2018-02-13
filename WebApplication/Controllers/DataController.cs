using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace WebApplication.Controllers
{

	public class DataController : Controller
	{
		private readonly string _apiUrl;
		private readonly HttpClient _client;

		public DataController(IConfiguration configuration)
		{
			_apiUrl = configuration["ApiUrl"];
			_client = new HttpClient();
		}

		[Route("api/bots")]
		[HttpGet]
		public async Task<string> GetBots()
		{
			return await _client.GetStringAsync(_apiUrl + "/api/bots");
		}

		[Route("api/add-bot")]
		[HttpPost]
		public async Task<string> AddBot(string name, string token)
		{
			var response = await _client.PostAsync(_apiUrl + "/api/add-bot", new FormUrlEncodedContent(new[]
			{
				new KeyValuePair<string, string>("name", name),
				new KeyValuePair<string, string>("token", token)
			}));

			return await response.Content.ReadAsStringAsync();
		}

		[Route("api/remove-bot")]
		[HttpPost]
		public async Task<string> AddBot(string id)
		{
			var response = await _client.PostAsync(_apiUrl + "/api/remove-bot", new FormUrlEncodedContent(new[]
			{
				new KeyValuePair<string, string>("id", id)
			}));

			return await response.Content.ReadAsStringAsync();
		}
	}
}