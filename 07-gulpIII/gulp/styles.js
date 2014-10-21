var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var less = require('gulp-less');
var rename = require('gulp-rename');

var release = gutil.env.production;

gulp.task('styles', function () {
	gulp.src('./src/colors.less')
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(gulpif(release, csso()))
		.pipe(rename('bundle.css'))
		.pipe(gulp.dest('./web'));
});
