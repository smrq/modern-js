var express = require('express');
var gulp = require('gulp');
var path = require('path');

gulp.task('serve', ['watch'], function () {
	var app = express();
	var port = process.env.PORT || 3000;

	app.set('views', path.join(__dirname, '../web/views'));
	app.set('view engine', 'jade');
	app.get('/', function (req, res) {
		res.render('index');
	});
	app.use(express.static(path.join(__dirname, '../web')));
	app.listen(port);
	console.log('Server listening on port ' + port);

	return app;
});
