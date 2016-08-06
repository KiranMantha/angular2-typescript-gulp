var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    del = require('del'),
    sass = require('gulp-sass'),
    PATHS = {
        src: 'src/**/*.ts'
    },
    gulpSequence = require('gulp-sequence').use(gulp);

//clean the dist folder
gulp.task('clean', function () {
    return del('dist/**/*');
});

//<-------------build tasks------------->//
gulp.task('scripts.systemjsConfig', function () {
    return gulp.src('systemjs.config.js')
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('scripts.angular.common', function () {
    return gulp.src('node_modules/@angular/common/bundles/common.umd.min.js')
        .pipe(gulp.dest('dist/scripts/angular/common'));
});

gulp.task('scripts.angular.compiler', function () {
    return gulp.src('node_modules/@angular/compiler/bundles/compiler.umd.min.js')
        .pipe(gulp.dest('dist/scripts/angular/compiler'));
});

gulp.task('scripts.angular.core', function () {
    return gulp.src('node_modules/@angular/core/bundles/core.umd.min.js')
        .pipe(gulp.dest('dist/scripts/angular/core'));
});

gulp.task('scripts.angular.http', function () {
    return gulp.src('node_modules/@angular/http/bundles/http.umd.min.js')
        .pipe(gulp.dest('dist/scripts/angular/http'));
});

gulp.task('scripts.angular.platform-browser', function () {
    return gulp.src('node_modules/@angular/platform-browser/bundles/platform-browser.umd.min.js')
        .pipe(gulp.dest('dist/scripts/angular/platform-browser'));
});

gulp.task('scripts.angular.platform-browser-dynamic', function () {
    return gulp.src('node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js')
        .pipe(gulp.dest('dist/scripts/angular/platform-browser-dynamic'));
});

gulp.task('scripts.angular.router', function () {
    return gulp.src('node_modules/@angular/router/**/*.js')
        .pipe(gulp.dest('dist/scripts/angular/router'));
});

gulp.task('scripts.angular.router-deprecated', function () {
    return gulp.src('node_modules/@angular/router-deprecated/bundles/router-deprecated.umd.min.js')
        .pipe(gulp.dest('dist/scripts/angular/router-deprecated'));
});

gulp.task('scripts.angular.upgrade', function () {
    return gulp.src('node_modules/@angular/upgrade/bundles/upgrade.umd.min.js')
        .pipe(gulp.dest('dist/scripts/angular/upgrade'));
});

gulp.task('scripts.angular', ['scripts.angular.common', 'scripts.angular.compiler', 'scripts.angular.core', 'scripts.angular.http', 'scripts.angular.platform-browser', 'scripts.angular.platform-browser-dynamic', 'scripts.angular.router', 'scripts.angular.router-deprecated', 'scripts.angular.upgrade'], function () {
    return gulp.src(
        'node_modules/angular2-in-memory-web-api/index.js'
    ).pipe(gulp.dest('dist/scripts/angular/angular2-in-memory-web-api'));
});

gulp.task('scripts.angular.rxjs', function () {
    return gulp.src('node_modules/rxjs/**/*.js')
        .pipe(gulp.dest('dist/scripts/angular/rxjs'));
});

gulp.task('scripts.lodash', function () {
    return gulp.src('node_modules/lodash/lodash.min.js')
        .pipe(gulp.dest('dist/scripts/lodash'));
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
    ]).pipe(gulp.dest('dist/scripts/lib'));
});

//copy html files into dist folder
gulp.task('scripts.html', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

//build css files from scss
gulp.task('scripts.css', function () {
    return gulp.src('src/styles/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

//build font files from bootstrap fonts
gulp.task('scripts.fonts', function () {
    return gulp.src(['!node_modules/bootstrap-sass/assets/fonts/bootstrap/*.eot','node_modules/bootstrap-sass/assets/fonts/bootstrap/*'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/fonts/bootstrap'));
});

//compile typescript files to javascript files
gulp.task('scripts.ts', function () {
    var typescript = require('gulp-typescript');
    var tscConfig = require('./tsconfig.json');

    var tsResult = gulp
        .src([PATHS.src, 'node_modules/typings/browser.d.ts'])
        .pipe(typescript(tscConfig.compilerOptions));

    return tsResult.js.pipe(gulp.dest('dist/scripts'));
});

//unified task for scripts
gulp.task('scripts', gulpSequence('scripts.lib', 'scripts.html', 'scripts.css','scripts.ts'));
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
gulp.task('watch', gulpSequence('watch.html', 'watch.css', 'watch.ts'));
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
gulp.task('default', gulpSequence('clean', 'scripts', 'watch', 'webserver'));
//<-------------default task------------->//
