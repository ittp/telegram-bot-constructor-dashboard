using System;

namespace WebApplication.Infrastructure
{
	public static class VersionExtestions
	{
		public static bool CompatibleWith(this Version connectedToVersion, Version requiresVersion)
		{
			return connectedToVersion >= requiresVersion;
		}
	}
}