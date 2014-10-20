var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var csso = require('gulp-csso');
var express = require('express');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var less = require('gulp-less');
var rename = require('gulp-rename');
var server = require('./server');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

var release = gutil.env.production;

gulp.task('default', ['scripts', 'styles']);

gulp.task('scripts', function () {
	var bundler = browserify();
	bundler.add('./colors.js')
		.transform('varlessify', { file: './colors.less' })
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(gulpif(release, uglify()))
		.pipe(gulp.dest('./web'));
});

gulp.task('styles', function () {
	gulp.src('./colors.less')
		.pipe(less())
		.pipe(gulpif(release, csso()))
		.pipe(rename('bundle.css'))
		.pipe(gulp.dest('./web'));
});

gulp.task('serve', ['scripts', 'styles'], function () {
	server();
});
