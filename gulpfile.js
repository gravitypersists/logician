var gulp = require('gulp');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');

gulp.task('babel', function () {
  return gulp.src('src/logician.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('mocha', function() {
  return gulp.src(['test/*.js'], { read: false })
      .pipe(mocha({ reporter: 'list' }))
      .on('error', gutil.log);
});

gulp.task('watch', function() {
    gulp.watch(['src/*.js', 'test/**'], ['babel', 'mocha']);
});

gulp.task('default', ['watch']);