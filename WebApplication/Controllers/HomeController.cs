using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication.Controllers
{
	public class HomeController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}

		[Route("/error")]
		public IActionResult Error()
		{
			ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
			return View();
		}

		[Route("/signin")]
		public IActionResult Signin()
		{
			return View();
		}
	}
}