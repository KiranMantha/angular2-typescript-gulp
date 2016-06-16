var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    del = require('del'),
    sass = require('gulp-sass'),
    PATHS = {
        src: 'src/**/*.ts'
    };

//clean the dist folder
gulp.task('clean', function () {
    return del(['dist/**/*']);
});

//copy the required scripts into dist folder
gulp.task('scripts.lib', function () {
    return gulp.src(['node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/systemjs/dist/system.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.js'])
        .pipe(gulp.dest('dist/scripts/lib'));
});

//copy html files into dist folder
gulp.task('scripts.html', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

//build css files from scss
gulp.task('scripts.css', function () {
  return gulp.src('src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('src/styles/**/*.scss', ['scripts.css']);
});

gulp.task('ts2js', function () {
    var typescript = require('gulp-typescript');
    var tscConfig = require('./tsconfig.json');

    var tsResult = gulp
        .src([PATHS.src, 'node_modules/angular2/typings/browser.d.ts'])
        .pipe(typescript(tscConfig.compilerOptions));

    return tsResult.js.pipe(gulp.dest('dist/scripts'));
});

gulp.task('webserver', function () {
    // var http = require('http');
    // var connect = require('connect');
    // var serveStatic = require('serve-static');
    // var open = require('open');

    // var port = 9000, app;

    // //gulp.watch(PATHS.src, ['ts2js']);

    // app = connect().use(serveStatic(__dirname));
    // http.createServer(app).listen(port, function () {
    //     open('http://localhost:' + port);
    // });

    gulp.src('dist')
        .pipe(webserver({
            port: 8080,
            open: true
        }));
});

gulp.task('default', ['clean', 'scripts.html', 'scripts.css', 'scripts.lib', 'ts2js', 'webserver']);
