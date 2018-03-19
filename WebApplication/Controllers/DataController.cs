using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace WebApplication.Controllers
{

	public class DataController : Controller
	{
		private readonly string _apiUrl;
        private readonly string _runnerApiUrl;
		private readonly HttpClient _client;

		public DataController(IConfiguration configuration)
		{
			_apiUrl = configuration["ApiUrl"];
            _runnerApiUrl = configuration["RunnerApiUrl"];
			_client = new HttpClient();
		}

        [Route("runner-api/{any}")]
        [HttpGet]
        public async Task<string> GetQueryToRunnerApi()
        {
            var pathValue = HttpContext.Request.Path.Value;
            var queryStringValue = HttpContext.Request.QueryString.Value;

            return await _client.GetStringAsync(_runnerApiUrl + pathValue + queryStringValue);
        }

        [Route("runner-api/{any}")]
        [HttpPost]
        public async Task<string> PostQueryToRunnerApi()
        {
            var pathValue = HttpContext.Request.Path.Value;
            var form = HttpContext.Request.Form.ToList();

            var keyValuePairs = form.Select(x => new KeyValuePair<string, string>(x.Key, x.Value));

            var encodedContent = new FormUrlEncodedContent(keyValuePairs);

            var apiHttpResponseMessage = await _client.PostAsync(_runnerApiUrl + pathValue, encodedContent);

            return await apiHttpResponseMessage.Content.ReadAsStringAsync();
        }

		[Route("api/{any}")]
		[HttpGet]
		public async Task<string> GetQueryToApi()
		{
			var pathValue = HttpContext.Request.Path.Value;
			var queryStringValue = HttpContext.Request.QueryString.Value;

			return await _client.GetStringAsync(_apiUrl + pathValue + queryStringValue);
		}

		[Route("api/{any}")]
		[HttpPost]
		public async Task<string> PostQueryToApi()
		{
			var pathValue = HttpContext.Request.Path.Value;
			var form = HttpContext.Request.Form.ToList();

			var keyValuePairs = form.Select(x => new KeyValuePair<string, string>(x.Key, x.Value));

			var encodedContent = new FormUrlEncodedContent(keyValuePairs);
			var apiHttpResponseMessage = await _client.PostAsync(_apiUrl + pathValue, encodedContent);

			return await apiHttpResponseMessage.Content.ReadAsStringAsync();
		}
	}
}