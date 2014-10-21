declare module ds.symposium.common.services {
	export interface IHomeService
	{
		getBrandishness(): ng.IPromise<models.IBrandishness[]>;
	}
}
