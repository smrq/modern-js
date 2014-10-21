var varless = require('varless');
var Chart = require('chartjs');

var ctx = document.querySelector('canvas.chart').getContext('2d');
var data = {
	labels: ['Brandishness'],
	datasets: [{
		label: 'DS Blue',
		fillColor: varless.get('color-dsi'),
		data: [62]
	}, {
		label: 'DS Red',
		fillColor: varless.get('color-tels'),
		data: [40]
	}, {
		label: 'DS Orange',
		fillColor: varless.get('color-dssi'),
		data: [46]
	}]
};
var barChart = new Chart(ctx).Bar(data, {
	barShowStroke: false
});
