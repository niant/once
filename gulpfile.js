var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var rimraf = require('rimraf');

gulp.task('clean', function (cb) {
  rimraf('dist', cb);
});

gulp.task('sass', function() {
	return gulp.src('src/sass/main.scss')
		.pipe(sass())
		.pipe(prefix('last 1 version', '> 1%'))
		.pipe(gulp.dest('dist/css')
  );
});

gulp.task('build-min', function () {
  return gulp.src('src/sass/main.scss')
    .pipe(sass())
    .pipe(prefix('last 1 version', '> 1%'))
    .pipe(cleanCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('runbuild', ['sass', 'build-min'], function () {});

gulp.task('build', ['clean'], function () {
  gulp.start('runbuild');
});

gulp.task('dev', ['sass', 'watch'], function () {});

gulp.task('default', ['clean'], function () {
  gulp.start('dev');
});


