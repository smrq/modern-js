/// <vs />
var fs = require('fs');
var path = require('path');

var tasks = fs.readdirSync(path.join(__dirname, 'Gulp'));
tasks.forEach(function (task) {
	require(path.join(__dirname, 'Gulp', task));
});
