var gulp = require('gulp'),     
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),    
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('styles', function() {
  return gulp.src('src/css/*.css')
    .pipe(concat('styles.css'))
    .pipe(autoprefixer('> 5%'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Css - tarea completada' }));
});

gulp.task('scripts', function() {
  return gulp.src(
      [
          'src/js/jquery.js',
          'src/js/*.js'
      ])    
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'JS - tarea completada' }));
});

// Clean
gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js'], cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

// Watch
gulp.task('watch', function() {

  gulp.watch('src/css/*.css', ['styles']);

  gulp.watch('src/js/*.js', ['scripts']);
});