var express = require('express');

module.exports = function () {
	var app = express();
	var port = process.env.PORT || 3000;

	app.set('views', __dirname + '/web/views');
	app.set('view engine', 'jade');
	app.get('/', function (req, res) {
		res.render('index');
	});
	app.use(express.static(__dirname + "/web"));
	app.listen(port);
	console.log("Server listening on port " + port);

	return app;
};
