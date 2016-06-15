var gulp = require('gulp');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var paths = {
    pages: ['src/*.html']
};

//get all html files
gulp.task('html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

//build sass files to css and place in dist folder
gulp.task('sass', function () {
  return gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(source('styles.css'))
    .pipe(gulp.dest('dist/css'));
});

//watch any changes done in sass files
gulp.task('sass:watch', function () {
  gulp.watch('src/styles/**/*.scss', ['sass']);
});

gulp.task('default',['html','sass','sass:watch'], function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'output.js'
        }))
        .pipe(gulp.dest('dist/scripts'));
});