using System;
using System.Collections.Generic;
using System.Linq;
using TypeLite;

namespace ModernJS.Models
{
	[TsClass]
	public class BrandishnessModel
	{
		public BrandColor BrandColor { get; set; }
		public string Name { get; set; }
		public int Brandishness { get; set; }
	}
}
