var browserify = require('browserify');
var watchify = require('watchify');

var bundler = watchify(browserify(watchify.args));
bundler
	.transform('brfs')
	.transform('varlessify', { file: 'hello.less' })
	.add('./x.js')
	.on('update', rebundle);
rebundle();

function rebundle() {
	return bundler.bundle()
		.pipe(process.stdout);
}
