using System.Linq;
using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Controllers
{
	public class BotPageController : Controller
	{
		private readonly Repository _repository;

		public BotPageController(Repository repository)
		{
			_repository = repository;
		}

		[Route("/bot-page")]
		[HttpGet]
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
			return View(viewModel);
		}

		[Route("/on-text-answers/remove")]
		[HttpPost]
		public IActionResult RemoveAnswer(string id, string token)
		{
			if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(token))
			{
				return Redirect($"/bot-page?token={token}");
			}

			_repository.RemoveAnswer(id);

			return Redirect($"/bot-page?token={token}");
		}

		[Route("/on-text-answers/add")]
		[HttpPost]
		public IActionResult AddAnswer(string messageText, string answerText, string token)
		{
			if (string.IsNullOrEmpty(messageText) || string.IsNullOrEmpty(answerText) || string.IsNullOrEmpty(token))
			{
				return Redirect($"/bot-page?token={token}");
			}

			_repository.AddAnswer(new Answer
			{
				AnswerText = answerText,
				BotAccessToken = token

			});

			return Redirect($"/bot-page?token={token}");
		}

		[Route("/inline-keys/remove")]
		[HttpPost]
		public IActionResult RemoveInlineKey(string id, string token)
		{
			if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(token))
			{
				return Redirect($"/bot-page?token={token}");
			}

			_repository.RemoveAnswer(id);

			return Redirect($"/bot-page?token={token}");
		}
	}
}