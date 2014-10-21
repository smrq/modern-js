var gulp = require('gulp');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');

gulp.task('watch', ['scripts-watch'], function () {
	var lr = livereload();
	gulp.watch('./web/**', {debounceDelay: 3000}).on('change', function (file) {
		lr.changed(file.path);
	});
	watch('./src/*.js', function (files, cb) {
		gulp.start('lint', cb);
	});
	watch('./src/*.less', function (files, cb) {
		gulp.start('styles', cb);
	});
});
