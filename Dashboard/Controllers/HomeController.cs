using System.Linq;
using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Controllers
{
	public class HomeController : Controller
	{
		private IRepository _repository;

		public HomeController(IRepository repository)
		{
			_repository = repository;
		}

		[Route("/")]
		public IActionResult Index()
		{
			var bots = _repository.GetBots().ToList();
			return View(bots);
		}

		[Route("/add")][HttpPost]
		public IActionResult AddBot(string botName, string botAccessToken)
		{
			_repository.AddBot(new Bot
			{
				botName = botName,
				botAccessToken = botAccessToken
			});
			return Redirect("/");
		}
	}
}