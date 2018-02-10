using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.InteropServices.ComTypes;
using Dashboard.Models;
using Microsoft.EntityFrameworkCore.Internal;
using Remotion.Linq.Parsing.Structure;

namespace Tests
{
	public class FakeRepository : IRepository
	{
		private List<Bot> _bots = new List<Bot>();
		private List<Answer> _answers = new List<Answer>();
		private List<InlineKey> _inlineKeys = new List<InlineKey>();
		private List<Interview> _interviews = new List<Interview>();
		private List<OnTextAnswer> _onTextAnswers = new List<OnTextAnswer>();

		public IEnumerable<Bot> GetBots() => _bots;

		public IEnumerable<Bot> GetBots(Expression<Func<Bot, bool>> predicat)
		{
			return _bots.Where(predicat.Compile());
		}

		public Bot GetBotByToken(string token)
		{
			return GetBots(x => x.BotAccessToken == token).FirstOrDefault();
		}

		public IEnumerable<Answer> GetAnswers() => _answers;

		public IEnumerable<InlineKey> GetInlineKeys() => _inlineKeys;

		public IEnumerable<Interview> GetInterviews() => _interviews;

		public IEnumerable<OnTextAnswer> GetOnTextAnswers() => _onTextAnswers;

		public void AddBot(Bot bot) => _bots.Add(bot);
	}
}