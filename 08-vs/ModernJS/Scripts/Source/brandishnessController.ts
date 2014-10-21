import varless = require('varless');
import common = ds.symposium.common;

class BrandishnessController {
	constructor($scope: any, data: common.models.IBrandishness[]) {
		var datasets: chart.IBarChartDataset[] = data.map((datum: common.models.IBrandishness) => ({
			label: datum.name,
			fillColor: this.brandColorToRgbColor(datum.brandColor),
			data: [datum.brandishness]
		}));
		var chartData: chart.IBarChartData = {
			labels: ['Brandishness'],
			datasets: datasets
		};
		$scope.data = chartData;
	}

	brandColorToRgbColor(color: common.models.BrandColor) {
		switch (color) {
			case ds.symposium.common.models.BrandColor.DsBlue:
				return varless.get('color-dsi');
			case ds.symposium.common.models.BrandColor.DssiOrange:
				return varless.get('color-dssi');
			case ds.symposium.common.models.BrandColor.TelsRed:
				return varless.get('color-tels');
		}
	}
}

export = BrandishnessController;
