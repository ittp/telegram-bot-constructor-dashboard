using Dashboard.Models;

namespace Tests
{
	public static class ModelsFather
	{

		public static InlineKey CreateInlineKey()
		{
			return new InlineKey
			{
				AnswerText = "answer",
				BotAccessToken = "token",
				ButtonText = "text"
			};
		}

		public static Bot CreateBot()
		{
			return new Bot
			{
				BotAccessToken = "token",
				BotName = "name"
			};
		}

		public static OnTextAnswer CreateOnTextAnswer()
		{
			return new OnTextAnswer
			{
				AnswerText = "answer",
				BotAccessToken = "token",
				MessageText = "message"
			};
		}

		public static Interview CreateInterview()
		{
			return new Interview
			{
				Question = "question",
				AnswerA = "a",
				AnswerB = "b",
				BotAccessToken = "token",
				InterviewName = "name"
			};
		}
	}
}