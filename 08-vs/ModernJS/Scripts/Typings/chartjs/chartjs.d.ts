// Type definitions for Chart.js 1.0.1-beta
// Project: https://github.com/nnnick/Chart.js
// Definitions by: Ben Dixon <https://github.com/bendxn/> and Greg Smith <https://github.com/smrq/>

declare class Chart {
	constructor(context: any);
	static defaults: chart.IDefaults;
	static types: {[key: string]: Function};
	[key: string]: Function;
	Bar(data: chart.IBarChartData, options: chart.IBarChartOptions): BarChart;
	StackedBar(data: chart.IBarChartData, options: chart.IBarChartOptions): BarChart;
	generateLegend(): string;
	destroy(): void;
}

declare class BarChart extends Chart {
	getBarsAtEvent(event: Event): { label: string }[];
}

declare module chart {
	interface IDefaults {
		global: IChartOptions;
		Line: ILineChartOptions;
		Bar: IBarChartOptions;
		Radar: IRadarChartOptions;
		PolarArea: IPolarAreaChartOptions;
		Pie: IPieChartOptions;
		Doughnut: IPieChartOptions;
	}

	interface IChartOptions {
		animation?: boolean;
		animationSteps?: number;
		animationEasing?: string;
		showScale?: boolean;
		scaleOverride?: boolean;
		scaleSteps?: number;
		scaleStepWidth?: number;
		scaleStartValue?: number;
		scaleLineColor?: string;
		scaleLineWidth?: number;
		scaleShowLabels?: boolean;
		scaleLabel?: string;
		scaleIntegersOnly?: boolean;
		scaleBeginAtZero?: boolean;
		scaleFontFamily?: string;
		scaleFontSize?: number;
		scaleFontStyle?: string;
		scaleFontColor?: string;
		responsive?: boolean;
		showTooltips?: boolean;
		tooltipEvents?: string[];
		tooltipFillColor?: string;
		tooltipFontFamily?: string;
		tooltipFontSize?: number;
		tooltipFontStyle?: string;
		tooltipFontColor?: string;
		tooltipTitleFontFamily?: string;
		tooltipTitleFontSize?: number;
		tooltipTitleFontStyle?: string;
		tooltipTitleFontColor?: string;
		tooltipYPadding?: number;
		tooltipXPadding?: number;
		tooltipCaretSize?: number;
		tooltipCornerRadius?: number;
		tooltipXOffset?: number;
		tooltipTemplate?: string;
		multiTooltipTemplate?: string;
		multiTooltipKeyBackground?: string;
		onAnimationProgress?: Function;
		onAnimationComplete?: Function;
	}

	interface IPieChartData {
		value: number;
		color: string;
		highlight: string;
		label: string;
	}

	interface IBarChartDataset {
		label?: string;
		fillColor: string;
		strokeColor?: string;
		highlightFill?: string;
		highlightStroke?: string;
		data: number[];
	}

	interface IBarChartData {
		labels: string[];
		datasets: IBarChartDataset[];
	}

	interface ILineChartOptions {
		scaleShowGridLines?: boolean;
		scaleGridLineColor?: string;
		scaleGridLineWidth?: number;
		bezierCurve?: boolean;
		bezierCurveTension?: number;
		pointDot?: boolean;
		pointDotRadius?: number;
		pointDotStrokeWidth?: number;
		pointHitDetectionRadius?: number;
		datasetStroke?: boolean;
		datasetStrokeWidth?: number;
		datasetFill?: boolean;
		legendTemplate?: string;
	}

	interface IBarChartOptions {
		scaleBeginAtZero?: boolean;
	    scaleShowGridLines?: boolean;
	    scaleGridLineColor?: string;
	    scaleGridLineWidth?: number;
	    barShowStrok?: boolean;
	    barStrokeWidth?: number;
	    barValueSpacing?: number;
	    barDatasetSpacing?: number;
	    legendTemplate?: string;
	}

	interface IRadarChartOptions {
		scaleShowLine?: boolean;
		angleShowLineOut?: boolean;
		scaleShowLabels?: boolean;
		scaleBeginAtZero?:  boolean;
		angleLineColor?: string;
		angleLineWidth?: number;
		pointLabelFontFamily?: string;
		pointLabelFontStyle?: string;
		pointLabelFontSize?: number;
		pointLabelFontColor?: string;
		pointDot?: boolean;
		pointDotRadius?: number;
		pointDotStrokeWidth?: number;
		pointHitDetectionRadius?: number;
		datasetStroke?: boolean;
		datasetStrokeWidth?: number;
		datasetFill?: boolean;
		legendTemplate?: string;
	}

	interface IPolarAreaChartOptions {
		scaleShowLabelBackdrop?: boolean;
		scaleBackdropColor?: string;
		scaleBeginAtZero?:  boolean;
		scaleBackdropPaddingY?: number;
		scaleBackdropPaddingX?: number;
		scaleShowLine?: boolean;
		segmentShowStroke?: boolean;
		segmentStrokeColor?: string;
		segmentStrokeWidth?: number;
		animationSteps?: number;
		animationEasing?: string;
		animateRotate?: boolean;
		animateScale?: boolean;
		legendTemplate?: string;
	}

	interface IPieChartOptions {
		segmentShowStroke?: boolean;
		segmentStrokeColor?: string;
		segmentStrokeWidth?: number;
		percentageInnerCutout?: number;
		animationSteps?: number;
		animationEasing?: string;
		animateRotate?: boolean;
		animateScale?: boolean;
		legendTemplate?: string;
	}
}
