/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'dist', // 'dist',
        '@angular': 'scripts/angular',
        'angular2-in-memory-web-api': 'scripts/angular/angular2-in-memory-web-api',
        'rxjs': 'scripts/angular/rxjs',
        'lodash': 'scripts/lodash'
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        '.': { defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'lodash': { main: 'lodash.min.js', defaultExtension: 'js' },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    };
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router-deprecated',
        'upgrade',
    ];
    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }
    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = { main: pkgName + '.umd.min.js', defaultExtension: 'js' };
        packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };
    }
    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);
    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})(this);
