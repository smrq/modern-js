var browserify = require('browserify');
var gulp = require('gulp');
var less = require('gulp-less');
var server = require('./server');
var source = require('vinyl-source-stream');

gulp.task('default', ['scripts', 'styles']);

gulp.task('scripts', function () {
	var bundler = browserify();
	bundler.add('./src/colors.js')
		.transform('browserify-shim')
		.transform('varlessify', { file: './src/colors.less' })
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./web'));
});

gulp.task('styles', function () {
	gulp.src('./src/colors.less')
		.pipe(less())
		.pipe(gulp.dest('./web'));
});

gulp.task('serve', ['scripts', 'styles'], function () {
	server();
});
