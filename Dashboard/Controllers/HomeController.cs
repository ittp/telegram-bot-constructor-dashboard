using System.Linq;
using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Controllers
{
	public class HomeController : Controller
	{
		private readonly Repository _repository;

		public HomeController(Repository repository)
		{
			_repository = repository;
		}

		[Route("/")]
		public IActionResult Index()
		{
			return View(_repository.GetBots().ToList());
		}

		[Route("/bots/add")]
		[HttpPost]
		public IActionResult AddBot(string name, string token)
		{
			_repository.AddBot(new Bot
			{
				BotName = name,
				BotAccessToken = token
			});
			return Redirect("/");
		}
	}
}