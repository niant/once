// Include gulp
var gulp = require('gulp');

// Include plugins
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var prefix = require('gulp-autoprefixer');
var styledocco = require('gulp-styledocco');
var csso = require('gulp-csso');
var rename = require('gulp-rename');

// Clean
gulp.task('clean', function () {
  gulp.src('build', {read: false})
    .pipe(clean());
});

// Lint Task
gulp.task('jslint', function() {
  return gulp.src('gulpfile.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default')
  );
});

// Sass compiling
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
    .pipe(gulp.dest('dist/css'))
});

// Styledocco
gulp.task('documentation', function() {
  return gulp.src('src/sass/*.scss')
	  .pipe(styledocco({
		  verbose: true,
		  out: 'docs',
		  name: 'Once'
	  })
  );
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('gulpfile.js', ['jslint']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/sass/**/*.scss', ['documentation']);
});

// Default Task
gulp.task('default', ['clean', 'jslint', 'sass', 'watch', 'documentation']);
