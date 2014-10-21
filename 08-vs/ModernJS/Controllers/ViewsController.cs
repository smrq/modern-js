using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;
using System.Web.SessionState;

namespace ModernJS.Controllers
{
	[SessionState(SessionStateBehavior.Disabled)]
	public class ViewsController : Controller
	{
		public virtual ActionResult GetTemplateView(string view)
		{
			if (view == null)
				throw new ArgumentNullException("view");
			var viewName = string.Format(CultureInfo.InvariantCulture, "~/Views/Templates/{0}.cshtml", view);
			var viewEngineResult = ViewEngines.Engines.FindView(ControllerContext, viewName, null);
			if (viewEngineResult.View == null)
				return new HttpNotFoundResult();
			return View(viewEngineResult.View);
		}
	}
}
