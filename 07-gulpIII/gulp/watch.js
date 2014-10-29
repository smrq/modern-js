var gulp = require('gulp');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');

gulp.task('watch', ['scripts-watch'], function () {
	livereload.listen();
	gulp.watch('./web/**').on('change', livereload.changed);
	watch('./src/*.js', function (files, cb) {
		gulp.start('lint', cb);
	});
	watch('./src/*.less', function (files, cb) {
		gulp.start('styles', cb);
	});
});
