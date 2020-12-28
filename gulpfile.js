var gulp = require('gulp');
var sass = require('gulp-dart-sass');
var prefix = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var rimraf = require('rimraf');

gulp.task('clean', (cb) => {
  rimraf('dist', cb);
});

gulp.task('sass', () => {
	return gulp.src('src/sass/main.scss')
		.pipe(sass())
		.pipe(prefix('last 1 version', '> 1%'))
		.pipe(gulp.dest('dist/css')
  );
});

gulp.task('build-min', () => {
  return gulp.src('src/sass/main.scss')
    .pipe(sass())
    .pipe(prefix('last 1 version', '> 1%'))
    .pipe(cleanCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', () => {
  gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('runbuild', gulp.series('sass', 'build-min'));

gulp.task('build', gulp.series('clean', 'runbuild'));

gulp.task('dev', gulp.series('sass', 'watch'));

gulp.task('default', gulp.series('clean', 'dev'));


