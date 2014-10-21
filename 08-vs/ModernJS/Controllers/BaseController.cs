using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace ModernJS.Controllers
{
	public abstract class BaseController : Controller
	{
		protected override JsonResult Json(object data, string contentType, Encoding contentEncoding)
		{
			return Json(data, contentType, contentEncoding, JsonRequestBehavior.DenyGet);
		}

		protected override JsonResult Json(object data, string contentType, Encoding contentEncoding, JsonRequestBehavior behavior)
		{
			return new JsonNetResult
			{
				Data = data,
				ContentEncoding = contentEncoding,
				ContentType = contentType,
				JsonRequestBehavior = behavior,
				SerializerSettings = new JsonSerializerSettings
				{
					ContractResolver = new CamelCasePropertyNamesContractResolver()
				}
			};
		}
	}
}
