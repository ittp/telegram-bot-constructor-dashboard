using System.Linq;
using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Controllers
{
	public class BotPageController : Controller
	{
		private IRepository _repository;

		public BotPageController(IRepository repository)
		{
			_repository = repository;
		}

		[Route("/bot")]
		public IActionResult Index(string token)
		{
			if (string.IsNullOrEmpty(token))
			{
				return Redirect("/");
			}
			var viewModel = new BotPageViewModel
			{
				Bot = _repository.GetBotByToken(token),
				Answers = _repository.GetAnswers().ToList(),
				InlineKeys = _repository.GetInlineKeys().ToList(),
				Interviews = _repository.GetInterviews().ToList(),
				OnTextAnswers = _repository.GetOnTextAnswers().ToList()
			};
			return View();
		}
	}
}