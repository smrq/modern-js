var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var csso = require('gulp-csso');
var express = require('express');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var watchify = require('watchify');

var release = gutil.env.production;

gulp.task('default', ['lint', 'scripts', 'styles']);

gulp.task('lint', function () {
	return gulp.src('./src/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

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

gulp.task('styles', function () {
	gulp.src('./src/colors.less')
		.pipe(less())
		.pipe(autoprefixer(['>1%', 'last 2 versions', 'ie9']))
		.pipe(gulpif(release, csso()))
		.pipe(rename('bundle.css'))
		.pipe(gulp.dest('./web'));
});

gulp.task('scripts-watch', function () {
	var bundler = watchify(browserify(watchify.args));
	bundler.add('./src/colors.js')
		.transform('browserify-shim')
		.transform('varlessify', { file: './src/variables.less' });
	bundler.on('update', rebundle);
	return rebundle();

	function rebundle() {
		return bundler.bundle()
			.pipe(source('bundle.js'))
			.pipe(buffer())
			.pipe(gulpif(release, uglify()))
			.pipe(gulp.dest('./web'));
	}
});

gulp.task('watch', ['lint', 'styles', 'scripts-watch'], function () {
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

gulp.task('serve', ['watch'], function () {
	var app = express();
	var port = process.env.PORT || 3000;

	app.set('views', __dirname + '/web/views');
	app.set('view engine', 'jade');
	app.get('/', function (req, res) {
		res.render('index');
	});
	app.use(express.static(__dirname + '/web'));
	app.listen(port);
	console.log('Server listening on port ' + port);

	return app;
});
