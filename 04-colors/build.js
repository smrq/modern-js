var browserify = require('browserify');
var fs = require('fs');
var less = require('less');

function buildScripts() {
	var bundler = browserify();
	bundler.add('./src/colors.js')
		.transform('browserify-shim')
		.transform('varlessify', { file: './src/colors.less' })
		.bundle()
		.pipe(fs.createWriteStream('./web/bundle.js'));
}

function buildStyles() {
	less.render(fs.readFileSync('./src/colors.less', 'utf-8'),
		function (e, css) {
			fs.writeFileSync('./web/bundle.css', css);
		});
}

buildScripts();
buildStyles();
