using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.Configuration;

namespace WebApplication.Infrastructure
{
	public class VersionAssertionFilter : IAsyncActionFilter
	{
		private IConfiguration _configuration;

		public VersionAssertionFilter(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
		{
			var apiVersionSiteIsConnectedTo = await GetApiVersion();
			var apiVersionSiteWorksRequires = new Version(_configuration["ApiVersion"]);

			var isSiteCompatibleWithApi = apiVersionSiteWorksRequires.CompatibleWith(apiVersionSiteIsConnectedTo);

			if (!isSiteCompatibleWithApi)
			{
				throw new Exception(
					$"Site({apiVersionSiteWorksRequires}) not compatible with Api {_configuration["ApiUrl"]} ({apiVersionSiteIsConnectedTo})");
			}

			await next();
		}

		private async Task<Version> GetApiVersion()
		{
			var stringApiVersion = "";

			try
			{
				var client = new HttpClient();
				stringApiVersion = await client.GetStringAsync(_configuration["ApiUrl"]);
			}
			catch (Exception e)
			{
				throw new Exception("Faled to assert that site is compatible with apis it depends on ");
			}

			return new Version(stringApiVersion);
		}
	}
}