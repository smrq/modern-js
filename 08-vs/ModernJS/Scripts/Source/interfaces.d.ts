declare module ds.symposium.common.controllers {
	export interface IBrandishnessScope {
		data: chart.IBarChartData;
	}
}

declare module ds.symposium.common.services {
	export interface IHomeService
	{
		getBrandishness(): ng.IPromise<models.IBrandishness[]>;
	}
}
