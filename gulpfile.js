var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    del = require('del'),
    sass = require('gulp-sass'),
    PATHS = {
        src: 'src/**/*.ts'
    };

//clean the dist folder
// gulp.task('clean', function () {
//     return del(['dist/**/*']);
// });

//<-------------build tasks------------->//
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

//compile typescript files to javascript files
gulp.task('scripts.ts', function () {
    var typescript = require('gulp-typescript');
    var tscConfig = require('./tsconfig.json');

    var tsResult = gulp
        .src([PATHS.src, 'node_modules/angular2/typings/browser.d.ts'])
        .pipe(typescript(tscConfig.compilerOptions));

    return tsResult.js.pipe(gulp.dest('dist/scripts'));
});

//unified task for scripts
gulp.task('scripts', ['scripts.lib', 'scripts.html', 'scripts.css', 'scripts.ts']);
//<-------------build tasks------------->//


//<-------------watch tasks------------->//
//watch task for css
gulp.task('watch.css', function () {
    gulp.watch('src/styles/**/*.scss', ['scripts.css']);
});

//watch task for html
gulp.task('watch.html', function () {
    gulp.watch('src/**/*.html', ['scripts.html']);
});

//watch task for html
gulp.task('watch.ts', function () {
    gulp.watch(PATHS.src, ['scripts.ts']);
});

//unified task for watch
gulp.task('watch', ['watch.html', 'watch.css', 'watch.ts']);
//<-------------watch tasks------------->//


//<-------------webserver task------------->//
gulp.task('webserver', function () {
    gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            port: 8080,
            open: true
        }));
});
//<-------------webserver task------------->//

//<-------------default task------------->//
gulp.task('default', ['scripts', 'watch', 'webserver']);
//<-------------default task------------->//
