import common = ds.symposium.common;

class HomeService implements common.services.IHomeService {
	constructor (private $http: ng.IHttpService) { }
	getBrandishness() {
		return this.$http.get<common.models.IBrandishness[]>('Home/Brandishness')
			.then(res => res.data);
	}
}

export = HomeService;
