using System;
using System.Collections;
using System.Collections.Generic;
using System.Dynamic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ModernJS
{
	// https://json.codeplex.com/discussions/347099
	public class JsonNetValueProviderFactory : ValueProviderFactory
	{
		public override IValueProvider GetValueProvider(ControllerContext controllerContext)
		{
			if (controllerContext == null)
				throw new ArgumentNullException("controllerContext");

			if (!controllerContext.HttpContext.Request.ContentType.StartsWith("application/json", StringComparison.OrdinalIgnoreCase))
				return null;

			var streamReader = new StreamReader(controllerContext.HttpContext.Request.InputStream);
			var jsonReader = new JsonTextReader(streamReader);

			if (!jsonReader.Read())
				return null;

			var jsonSerializer = new JsonSerializer();
			jsonSerializer.Converters.Add(new ExpandoObjectConverter());

			Object jsonObject;

			// if we start with a "[", treat this as an array
			if (jsonReader.TokenType == JsonToken.StartArray)
				jsonObject = jsonSerializer.Deserialize<List<ExpandoObject>>(jsonReader);
			else
				jsonObject = jsonSerializer.Deserialize<ExpandoObject>(jsonReader);

			var backingStore = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
			AddToBackingStore(backingStore, String.Empty, jsonObject);
			return new DictionaryValueProvider<object>(backingStore, CultureInfo.CurrentCulture);
		}

		private static void AddToBackingStore(IDictionary<string, object> backingStore, string prefix, object value)
		{
			var dictionary = value as IDictionary<string, object>;
			if (dictionary != null)
			{
				foreach (var entry in dictionary)
				{
					AddToBackingStore(backingStore, MakePropertyKey(prefix, entry.Key), entry.Value);
				}
				return;
			}

			var list = value as IList;
			if (list != null)
			{
				for (var i = 0; i < list.Count; i++)
				{
					AddToBackingStore(backingStore, MakeArrayKey(prefix, i), list[i]);
				}
				return;
			}

			backingStore[prefix] = value;
		}

		private static string MakeArrayKey(string prefix, int index)
		{
			return prefix + "[" + index.ToString(CultureInfo.InvariantCulture) + "]";
		}

		private static string MakePropertyKey(string prefix, string propertyName)
		{
			return string.IsNullOrEmpty(prefix) ?
				propertyName :
				prefix + "." + propertyName;
		}
	}
}