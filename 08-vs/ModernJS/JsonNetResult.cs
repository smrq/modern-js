using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ModernJS
{
	// https://json.codeplex.com/discussions/347099
	public class JsonNetResult : JsonResult
	{
		public JsonSerializerSettings SerializerSettings { get; set; }

		public JsonNetResult()
		{
			SerializerSettings = new JsonSerializerSettings();
			SerializerSettings.Converters.Add(new IsoDateTimeConverter());
		}

		public override void ExecuteResult(ControllerContext context)
		{
			if (context == null)
				throw new ArgumentNullException("context");

			context.HttpContext.Response.ContentType = string.IsNullOrEmpty(ContentType) ? "application/json" : ContentType;
			if (ContentEncoding != null)
				context.HttpContext.Response.ContentEncoding = ContentEncoding;

			if (Data == null)
				return;
			var jsonText = JsonConvert.SerializeObject(Data, Formatting.None, SerializerSettings);
			context.HttpContext.Response.Write(jsonText);
		}
	}
}