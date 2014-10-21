var gulp = require('gulp');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');

gulp.task('watch', ['scripts-watch'], function () {
	var lr = livereload();
	gulp.watch(['./Content/**', './Views/**'], {debounceDelay: 3000}).on('change', function (file) {
		lr.changed(file.path);
	});
	watch('./Scripts/*.js', function (files, cb) {
		gulp.start('lint', cb);
	});
	watch('./Styles/*.less', function (files, cb) {
		gulp.start('styles', cb);
	});
});
