using System.Collections.Generic;
using Dashboard.Models;
using MongoDB.Bson;
using Xunit;

namespace Tests
{
	public class UnitTests
	{
		private FakeRepository _repository;

		public UnitTests()
		{
			_repository = new FakeRepository();
		}
	}
}