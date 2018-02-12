using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication.Controllers
{

	public class DataController : Controller
	{
		private readonly HttpClient _client  = new HttpClient();

		[Route("api/bots")]
		public async Task<string> GetBots()
		{
			var data = await _client.GetStringAsync("http://localhost:3000/api/bots");

			return data;
		}
	}
}