var browserify = require('browserify');
var fs = require('fs');
var bundler = browserify();

bundler.add('./main.js')
	.bundle()
	.pipe(fs.createWriteStream('./web/bundle.js'));
