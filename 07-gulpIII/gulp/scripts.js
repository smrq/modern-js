var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

var release = gutil.env.production;

gulp.task('scripts', function () {
	var bundler = browserify();
	bundler.add('./src/colors.js')
		.transform('browserify-shim')
		.transform('varlessify', { file: './src/variables.less' })
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(gulpif(release, uglify()))
		.pipe(gulp.dest('./web'));
});
