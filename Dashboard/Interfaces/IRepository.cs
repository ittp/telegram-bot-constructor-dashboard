using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Dashboard.Models
{
	public interface IRepository
	{
		IEnumerable<Bot> GetBots();
		IEnumerable<Bot> GetBots(Expression<Func<Bot, bool>> predicat);
		Bot GetBotByToken(string token);
		IEnumerable<Answer> GetAnswers();
		IEnumerable<InlineKey> GetInlineKeys();
		IEnumerable<Interview> GetInterviews();
		IEnumerable<OnTextAnswer> GetOnTextAnswers();
		void AddBot(Bot bot);
	}
}