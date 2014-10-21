import fs = require('fs');
import _ = require('lodash');
import Chart = require('chartjs');

Chart.defaults.global.multiTooltipTemplate =
	fs.readFileSync(__dirname + '/dsChart.multiTooltip.tmpl', 'utf-8');
Chart.defaults.Doughnut.legendTemplate =
	fs.readFileSync(__dirname + '/dsChart.doughnutLegend.tmpl', 'utf-8');
Chart.defaults.Doughnut.animationEasing = 'easeOutQuad';
Chart.defaults.Doughnut.animationSteps = 85;
Chart.defaults.Bar.legendTemplate =
	fs.readFileSync(__dirname + '/dsChart.barLegend.tmpl', 'utf-8');

/*@ngInject*/
export function dsChart(): ng.IDirective {
	return {
		restrict: 'A',
		scope: {
			type: '@',
			data: '=',
			options: '=',
			showLegend: '='
		},
		replace: true,
		templateUrl: 'Views/Directives/dsChart',
		controller: DsChartCtrl,
		link: (scope: any, element: ng.IAugmentedJQuery, attrs: {}, ctrl: DsChartCtrl) => {
			var canvasWrapper = element.find('.canvas-wrapper');

			var canvasElement = canvasWrapper.find('canvas');
			var context = (<HTMLCanvasElement>canvasElement[0]).getContext('2d');

			ctrl.init(element, canvasWrapper, canvasElement, context);
		}
	};
}

export class DsChartCtrl {
	customChartInitFunctions: { [key: string]: () => void } = {
		'Bar': this.initBarChart,
		'StackedBar': this.initBarChart
	};
	element: JQuery;
	canvasWrapper: JQuery;
	canvasElement: JQuery;
	context: CanvasRenderingContext2D;
	chart: Chart;

	/*@ngInject*/
	constructor(private $scope: any, private $sce: ng.ISCEService) { }

	init(element: JQuery,
		canvasWrapper: JQuery,
		canvasElement: JQuery,
		context: CanvasRenderingContext2D)
	: void {
		this.element = element;
		this.canvasWrapper = canvasWrapper;
		this.canvasElement = canvasElement;
		this.context = context;

		this.createChart();

		this.$scope.$watch('type', (newType: string, oldType: string) => {
			if (newType !== oldType)
				this.createChart();
		});

		this.$scope.$on('$destroy', () => {
			this.chart.destroy();
		});
	}

	createChart(): void {
		if (this.chart)
			this.chart.destroy();

		this.setChartClass(this.$scope.type);
		this.context.canvas.width = this.canvasWrapper.width();
		this.context.canvas.height = this.canvasWrapper.height();
		this.chart = new Chart(this.context)[this.$scope.type](this.$scope.data, this.$scope.options);
		this.$scope.legendHtml = this.$sce.trustAsHtml(this.chart.generateLegend());

		var customInit = this.customChartInitFunctions[this.$scope.type];
		if (customInit)
			customInit.call(this);
	}

	setChartClass(newChartType: string): void {
		_.each(_.keys(Chart.types), (chartType: string) => {
			this.element.removeClass(chartTypeToClass(chartType));
		});
		this.element.addClass(chartTypeToClass(newChartType));
	}

	initBarChart(): void {
		this.canvasElement.mousemove((event) => this.onBarChartMouseMove(event, <BarChart>this.chart));
		this.canvasElement.click((event) => this.onBarChartClick(event, <BarChart>this.chart));
	}

	onBarChartMouseMove(event: Event, chart: BarChart): void {
		var bars = chart.getBarsAtEvent(event);
		if (bars.length > 0)
			this.canvasElement.css('cursor', 'pointer');
		else
			this.canvasElement.css('cursor', 'default');
	}

	onBarChartClick(event: Event, chart: BarChart): void {
		var bars = chart.getBarsAtEvent(event);
		if (bars.length > 0)
			this.$scope.$emit('category-click', bars[0].label);
	}
}

function chartTypeToClass(chartType: string): string {
	chartType = chartType[0].toLowerCase() + chartType.slice(1);
	chartType = chartType.replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
	return 'ds-' + chartType + '-chart';
}
