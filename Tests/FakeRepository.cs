using System.Collections.Generic;
using System.Linq;
using Dashboard.Models;

namespace Tests
{
	public class FakeRepository : IRepository
	{
		private IEnumerable<Bot> _bots = new List<Bot>();
		private IEnumerable<Answer> _answers = new List<Answer>();
		private IEnumerable<InlineKey> _inlineKeys = new List<InlineKey>();
		private IEnumerable<Interview> _interviews = new List<Interview>();
		private IEnumerable<OnTextAnswer> _onTextAnswers = new List<OnTextAnswer>();

		public IEnumerable<Bot> GetBots() => _bots;

		public IEnumerable<Answer> GetAnswers() => _answers;

		public IEnumerable<InlineKey> GetInlineKeys() => _inlineKeys;

		public IEnumerable<Interview> GetInterviews() => _interviews;

		public IEnumerable<OnTextAnswer> GetOnTextAnswers() => _onTextAnswers;

		public void AddBot(Bot bot) => _bots.Append(bot);
	}
}