using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace WebApplication.Controllers
{

	public class DataController : Controller
	{
		private IConfiguration _configuration;

		public DataController(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		private readonly HttpClient _client  = new HttpClient();

		[Route("api/bots")]
		public async Task<string> GetBots()
		{
			return await _client.GetStringAsync(_configuration["ApiUrl"] + "/api/bots");
		}
	}
}