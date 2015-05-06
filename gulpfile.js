var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    sass = require('gulp-sass'),
    emailBuilder = require('gulp-email-builder'),
		server = require('gulp-server-livereload');

gulp.task('imagemin', function () {
  gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('sass', function () {
    gulp.src('src/scss/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('src/css'));
});

gulp.task('emailBuilder', function() {
    return gulp.src(['src/*.html'])
      .pipe(emailBuilder())
      .pipe(gulp.dest('dist/'));
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(server({
      livereload: true,
      open: true
    }));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*', ['imagemin', 'sass', 'emailBuilder']);
});

gulp.task('default', [ 'imagemin', 'sass', 'webserver', 'watch']);