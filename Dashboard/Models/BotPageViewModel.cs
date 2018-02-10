using System.Collections.Generic;

namespace Dashboard.Models
{
	public class BotPageViewModel
	{
		public Bot Bot { get; set; }
		public List<OnTextAnswer> OnTextAnswers { get; set; }
		public List<InlineKey> InlineKeys { get; set; }
		public List<Interview> Interviews { get; set; }
		public List<Answer> Answers { get; set; }
	}
}