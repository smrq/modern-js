using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace ModernJS
{
	public static class ValueProviderConfig
	{
		public static void RegisterValueProviderFactories(ValueProviderFactoryCollection factories)
		{
			factories.Remove(factories.OfType<JsonValueProviderFactory>().FirstOrDefault());
			factories.Add(new JsonNetValueProviderFactory());
		}
	}
}