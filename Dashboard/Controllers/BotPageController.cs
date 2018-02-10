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
		[HttpGet]
		public IActionResult RemoveAnswer(string id, string token)
		{
			if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(token))
			{
				return Redirect($"/bot-page?token={token}");
			}

			_repository.RemoveOnTextAnswer(id);

			return Redirect($"/bot-page?token={token}");
		}

		[Route("/on-text-answers/add")]
		[HttpPost]
		public IActionResult AddOnTextAnswer(string messageText, string answerText, string token)
		{
			if (string.IsNullOrEmpty(messageText) || string.IsNullOrEmpty(answerText) || string.IsNullOrEmpty(token))
			{
				return Redirect($"/bot-page?token={token}");
			}

			_repository.AddOnTextAnswer(new OnTextAnswer
			{
				MessageText = messageText,
				AnswerText = answerText,
				BotAccessToken = token
			});

			return Redirect($"/bot-page?token={token}");
		}

		[Route("/inline-keys/remove")]
		[HttpGet]
		public IActionResult RemoveInlineKey(string id, string token)
		{
			if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(token))
			{
				return Redirect($"/bot-page?token={token}");
			}

			_repository.RemoveInlineKey(id);

			return Redirect($"/bot-page?token={token}");
		}

		[Route("/inline-keys/add")]
		[HttpPost]
		public IActionResult AddInlineKey(string answerText, string buttonText, string token)
		{
			if (string.IsNullOrEmpty(token) || string.IsNullOrEmpty(answerText) || string.IsNullOrEmpty(buttonText))
			{
				return Redirect($"/bot-page?token={token}");
			}

			_repository.AddInlineKey(new InlineKey
			{
				AnswerText = answerText,
				BotAccessToken = token,
				ButtonText = buttonText
			});

			return Redirect($"/bot-page?token={token}");
		}

		[Route("/interviews/remove")]
		[HttpGet]
		public IActionResult RemoveInterView(string id, string token)
		{
			if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(token))
			{
				return Redirect($"/bot-page?token={token}");
			}

			_repository.RemoveInterview(id);

			return Redirect($"/bot-page?token={token}");
		}

		[Route("/interviews/add")]
		[HttpPost]
		public IActionResult AddInterview(string token, string interviewName, string answerA, string answerB, string question)
		{
			if (string.IsNullOrEmpty(token))
			{
				return Redirect($"/bot-page?token={token}");
			}

			_repository.AddInterview(new Interview
			{
				InterviewName = interviewName,
				AnswerA = answerA,
				AnswerB = answerB,
				Question = question,
				BotAccessToken = token
			});

			return Redirect($"/bot-page?token={token}");
		}
	}
}