// Include gulp
var gulp = require('gulp');

var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var prefix = require('gulp-autoprefixer');
var styledocco = require('gulp-styledocco');
var csso = require('gulp-csso');
var rename = require('gulp-rename');

gulp.task('clean', function () {
  gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('jslint', function() {
  return gulp.src('gulpfile.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default')
  );
});

gulp.task('sass', function() {
	return gulp.src('src/sass/main.scss')
		.pipe(sass({sourcemap: true}))
		.pipe(prefix('last 1 version', '> 1%'))
		.pipe(gulp.dest('dist/css')
  );
});

gulp.task('build-min', function () {
  return gulp.src('src/sass/main.scss')
    .pipe(sass())
    .pipe(prefix('last 1 version', '> 1%'))
    .pipe(csso())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('documentation', function() {
  return gulp.src('src/sass/*.scss')
	  .pipe(styledocco({
		  verbose: true,
		  out: 'docs',
		  name: 'Once'
	  })
  );
});

gulp.task('watch', function() {
  gulp.watch('gulpfile.js', ['jslint']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/sass/**/*.scss', ['documentation']);
});

gulp.task('runbuild', ['jslint', 'sass', 'build-min'], function () {
  gulp.start('documentation');
});

gulp.task('build', ['clean'], function () {
  gulp.start('runbuild');
});

gulp.task('dev', ['jslint', 'sass', 'watch'], function () {
  gulp.start('documentation');
});

gulp.task('default', ['clean'], function () {
  gulp.start('dev');
});


