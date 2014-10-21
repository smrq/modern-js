using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using ModernJS.Models;

namespace ModernJS.Controllers
{
	public class HomeController : BaseController
	{
		public ActionResult Index()
		{
			return View();
		}

		public JsonResult Brandishness()
		{
			return Json(new []
			{
				new BrandishnessModel
				{
					BrandColor = BrandColor.DsBlue,
					Name = "DS Blue",
					Brandishness = 62
				},

				new BrandishnessModel
				{
					BrandColor = BrandColor.TelsRed,
					Name = "TELS Red",
					Brandishness = 40
				},

				new BrandishnessModel
				{
					BrandColor = BrandColor.DssiOrange,
					Name = "DSSI Orange",
					Brandishness = 46
				}
			});
		}
	}
}
