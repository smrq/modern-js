var browserify = require('browserify');
var fs = require('fs');
var less = require('less');

function buildScripts() {
	var bundler = browserify();
	bundler.add('./colors.js')
		.transform('varlessify', { file: './colors.less' })
		.bundle()
		.pipe(fs.createWriteStream('./web/bundle.js'));	
}

function buildStyles() {
	less.render(fs.readFileSync('./colors.less', 'utf-8'), function (e, css) {
		fs.writeFileSync('./web/bundle.css', css);
	});
}

buildScripts();
buildStyles();
