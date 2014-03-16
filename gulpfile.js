// Include gulp
var gulp = require('gulp');

// Include plugins
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var prefix = require('gulp-autoprefixer');
var styledocco = require('gulp-styledocco');

// Clean
gulp.task('clean', function () {
  gulp.src('build', {read: false})
    .pipe(clean());
});

// Lint Task
gulp.task('jslint', function() {
  return gulp.src('gulpfile.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Sass compiling
gulp.task('sass', function() {
  return gulp.src('src/sass/main.scss')
    .pipe(sass())
    .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
    .pipe(gulp.dest('dist/css'))
    .pipe(styledocco({
      out: 'docs',
      name: 'Once'
    }));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('gulpfile.js', ['jslint']);
  gulp.watch('src/sass/main.scss', ['sass']);
});

// Default Task
gulp.task('default', ['clean', 'jslint', 'sass', 'watch']);