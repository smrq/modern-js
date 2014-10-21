import common = ds.symposium.common;

class HomeService implements common.services.IHomeService {
	/*@ngInject*/
	constructor (private $http: ng.IHttpService) { }

	getBrandishness(): ng.IPromise<common.models.IBrandishness[]> {
		return this.$http.get<common.models.IBrandishness[]>('Home/Brandishness')
			.then(res => res.data);
	}
}

export = HomeService;
