const gulp = require('gulp');
//const webserver = require('gulp-webserver');
const webserver = require("browser-sync").create();
const del = require('del');
const sass = require('gulp-sass');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const gulpSequence = require('gulp-sequence');
const size = require('gulp-size');
const sourcemaps = require('gulp-sourcemaps');
const typescript = require('gulp-typescript');
const GULP_SIZE_DEFAULT_CONFIG = {
    showFiles: false,
    gzip: false
};
const PATHS = {
    typings: [
        // Ensures ES6/7 API definitions are available when transpiling TS to JS.
        'node_modules/typescript/lib/lib.es7.d.ts',
        'node_modules/typescript/lib/lib.dom.d.ts',
        // Typings definitions for 3rd party libs
        'typings/index.d.ts'
    ],
    dist: 'dist',
    ts: 'src/**/*.ts',
    html: ['src/**/*.html'],
    css: ['src/styles/style.scss'],
    fonts: ['node_modules/font-awesome/fonts/*']
};

//clean the dist folder
gulp.task('clean', function clean(done) {
    return del([PATHS.dist], done);
});

//<-------------build tasks------------->//
gulp.task('scripts.systemjsConfig', function () {
    return gulp.src('systemjs.config.js')
        .pipe(gulp.dest(PATHS.dist + '/scripts'));
});

gulp.task('scripts.angular.common', function () {
    return gulp.src('node_modules/@angular/common/bundles/common.umd.min.js')
        .pipe(gulp.dest(PATHS.dist + '/scripts/angular/common'));
});

gulp.task('scripts.angular.compiler', function () {
    return gulp.src('node_modules/@angular/compiler/bundles/compiler.umd.min.js')
        .pipe(gulp.dest(PATHS.dist + '/scripts/angular/compiler'));
});

gulp.task('scripts.angular.core', function () {
    return gulp.src('node_modules/@angular/core/bundles/core.umd.min.js')
        .pipe(gulp.dest(PATHS.dist + '/scripts/angular/core'));
});

gulp.task('scripts.angular.forms', function () {
    return gulp.src('node_modules/@angular/forms/bundles/forms.umd.min.js')
        .pipe(gulp.dest(PATHS.dist + '/scripts/angular/forms'));
});

gulp.task('scripts.angular.http', function () {
    return gulp.src('node_modules/@angular/http/bundles/http.umd.min.js')
        .pipe(gulp.dest(PATHS.dist + '/scripts/angular/http'));
});

gulp.task('scripts.angular.platform-browser', function () {
    return gulp.src('node_modules/@angular/platform-browser/bundles/platform-browser.umd.min.js')
        .pipe(gulp.dest(PATHS.dist + '/scripts/angular/platform-browser'));
});

gulp.task('scripts.angular.platform-browser-dynamic', function () {
    return gulp.src('node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js')
        .pipe(gulp.dest(PATHS.dist + '/scripts/angular/platform-browser-dynamic'));
});

gulp.task('scripts.angular.router', function () {
    return gulp.src('node_modules/@angular/router/**/*.js')
        .pipe(gulp.dest(PATHS.dist + '/scripts/angular/router'));
});

gulp.task('scripts.angular.router-deprecated', function () {
    return gulp.src('node_modules/@angular/router-deprecated/bundles/router-deprecated.umd.min.js')
        .pipe(gulp.dest(PATHS.dist + '/scripts/angular/router-deprecated'));
});

gulp.task('scripts.angular.upgrade', function () {
    return gulp.src('node_modules/@angular/upgrade/bundles/upgrade.umd.min.js')
        .pipe(gulp.dest(PATHS.dist + '/scripts/angular/upgrade'));
});

gulp.task('scripts.angular', ['scripts.angular.common', 'scripts.angular.compiler', 'scripts.angular.core', 'scripts.angular.forms', 'scripts.angular.http', 'scripts.angular.platform-browser', 'scripts.angular.platform-browser-dynamic', 'scripts.angular.router', 'scripts.angular.router-deprecated', 'scripts.angular.upgrade'], function () {
    return gulp.src(
        'node_modules/angular2-in-memory-web-api/index.js'
    ).pipe(gulp.dest(PATHS.dist + '/scripts/angular/angular2-in-memory-web-api'));
});

gulp.task('scripts.angular.rxjs', function () {
    return gulp.src('node_modules/rxjs/**/*.js')
        .pipe(gulp.dest(PATHS.dist + '/scripts/angular/rxjs'));
});

gulp.task('scripts.lodash', function () {
    return gulp.src('node_modules/lodash/lodash.min.js')
        .pipe(gulp.dest(PATHS.dist + '/scripts/lodash'));
});

//copy the required scripts into dist folder
gulp.task('scripts.lib', ['scripts.systemjsConfig', 'scripts.angular', 'scripts.angular.rxjs', 'scripts.lodash'], function () {
    return gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap-sass/assets/javascripts/bootstrap-sprockets.js',
        'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js'
    ]).pipe(gulp.dest(PATHS.dist + '/scripts/lib'));
});

//copy html files into dist folder
gulp.task('scripts.html', function () {
    return gulp.src(PATHS.html)
        .pipe(gulp.dest(PATHS.dist));
});

//build css files from scss
gulp.task('scripts.css', function () {
    return gulp.src(PATHS.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(PATHS.dist + '/css'));
});

//build font files from bootstrap fonts
gulp.task('scripts.fonts', function () {
    return gulp.src(PATHS.fonts)
        .pipe(gulp.dest(PATHS.dist + '/fonts'));
});

//compile typescript files to javascript files
gulp.task('scripts.ts', function () {
    return gulp
        .src([].concat(PATHS.ts), {
            base: './src'
        })
        .pipe(changed(PATHS.dist, {
            extension: '.js'
        }))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(typescript(typescript.createProject('tsconfig.json', {
            typescript: require('typescript')
        })))
        .js
        .pipe(sourcemaps.write('.'))
        .pipe(size(GULP_SIZE_DEFAULT_CONFIG))
        .pipe(gulp.dest(PATHS.dist + '/scripts'));
});

//unified task for scripts
gulp.task('scripts', function (done) {
    runSequence('clean', 'scripts.fonts', 'scripts.lib', 'scripts.html', 'scripts.css', 'scripts.ts', done);
});
//<-------------build tasks------------->//


//<-------------watch tasks------------->//
gulp.task('watch.css', function () {
    gulp.watch(PATHS.css, ['scripts.css']).on('change', webserver.reload);
});

//watch task for html
gulp.task('watch.html', function () {
    gulp.watch(PATHS.html, ['scripts.html']).on('change', webserver.reload);
});

//watch task for html
gulp.task('watch.ts', function () {
    gulp.watch(PATHS.ts, ['scripts.ts']).on('change', webserver.reload);
});

//unified task for watch
gulp.task('watch', function (done) {
    runSequence('watch.html', 'watch.css', 'watch.ts', done);
});
//<-------------watch tasks------------->//

//<-------------webserver task------------->//
gulp.task('webserver', function () {
    webserver.init({
        server: "./dist",
        port: 8080
    });
});
//<-------------webserver task------------->//

//<-------------default task------------->//
//gulp.task('default', ['scripts', 'watch', 'webserver']);
gulp.task('default', function (done) {
    runSequence('scripts', 'watch', 'webserver', done);
});
//gulp.task('default', gulpSequence('scripts', 'watch', 'webserver'));
//<-------------default task------------->//
