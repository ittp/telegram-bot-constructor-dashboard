using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Controllers
{
	public class BotPageController : Controller
	{
		[Route("/bot")]
		public IActionResult Index()
		{
			return View();
		}
	}
}