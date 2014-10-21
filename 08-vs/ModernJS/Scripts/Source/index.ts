﻿import varless = require('varless');
import Chart = require('chartjs');
import angular = require('angular');
import angularRoute = require('angular-route');

import brandishnessController = require('./brandishnessController');
import dsChart = require('./dsChart/dsChart');
import homeService = require('./homeService');

import common = ds.symposium.common;

angular.module('ds.symposium', [angularRoute.name])
	.controller('brandishnessController', brandishnessController)
	.directive('dsChart', dsChart.dsChart)
	.service('homeService', homeService)
	.config(($routeProvider: ng.route.IRouteProvider) => {
		$routeProvider.when('/', {
			templateUrl: '/Views/Brandishness',
			controller: 'brandishnessController',
			resolve: {
				data: (homeService: common.services.IHomeService) => homeService.getBrandishness()
			}
		});
});