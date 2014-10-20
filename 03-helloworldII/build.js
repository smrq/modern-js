var browserify = require('browserify');
var fs = require('fs');

var bundler = browserify();
bundler.add('../01-node/hello.js')
	.transform('brfs')
	.bundle()
	.pipe(fs.createWriteStream('./web/bundle.js'));
