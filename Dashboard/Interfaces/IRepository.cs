using System.Collections.Generic;

namespace Dashboard.Models
{
	public interface IRepository
	{
		IEnumerable<Bot> GetBots();
		IEnumerable<Answer> GetAnswers();
		IEnumerable<InlineKey> GetInlineKeys();
		IEnumerable<Interview> GetInterviews();
		IEnumerable<OnTextAnswer> GetOnTextAnswers();
		void AddBot(Bot bot);
	}
}