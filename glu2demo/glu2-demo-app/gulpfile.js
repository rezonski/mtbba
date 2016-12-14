/* eslint-disable no-var,block-scoped-var,no-use-before-define,vars-on-top,object-shorthand */
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var modRewrite = require('connect-modrewrite');
var connect = require('gulp-connect');
var sequence = require('gulp-sequence');
var mold = require('mold-source-map');
var watchify = require('watchify');
var browserify = require('browserify');
var concatCSS = require('gulp-concat-css');
var less = require('gulp-less');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var cleanCSS = new LessPluginCleanCSS({ advanced: true });
var livereload = require('gulp-livereload');
var merge = require('merge-stream');
var minifyCSS = require('gulp-clean-css');
var rimraf = require('rimraf');
var eslint = require('gulp-eslint');
var path = require('path');
var cssAutoPrefixer = require('gulp-autoprefixer');
var header = require('gulp-header');
var pkg = require('.././package.json');
var version = pkg.version;

/* Node module directory */
var NODE_MODULE_DIR = '../node_modules';

/* Location of template file used for building the index.html file */
var TEMPLATE_FILE = './template.html';

/* build files with version number */
var VENDOR_CSS = 'vendor_' + version + '.css';
var VENDOR_JS = 'vendor_' + version + '.js';

var APP_CSS = 'app_' + version + '.css';
var APP_JS = 'app.js';
var APP_JS_DESTINATION = 'app_' + version + '.js';

/* JavaScript files that should be injected into template file when building the index.html file */
var TEMPLATE_JS_FILES = [
    './demo/js/' + VENDOR_JS,
    './demo/js/' + APP_JS_DESTINATION,
];

/* CSS files that should be injected into template file when building the index.html file */
var TEMPLATE_CSS_FILES = [
    './demo/css/' + VENDOR_CSS,
    './demo/css/' + APP_CSS,
];

/* Build source paths */
var JS_SRC = './src';
var JS_VENDOR_SRC = './js';
var LESS_SRC = './src/less';
var ASSETS_SRC = './assets';

/* Build destination paths */
var JS_DEST = './demo/js';
var JS_VENDOR_DEST = './demo/js';
var CSS_DEST = './demo/css';
var ASSETS_DEST = './demo';

var COMPILED_TEMPLATE_FILE_DEST = './demo';

var SUPPORTED_ENVIRONMENTS = ['local', 'development', 'rc', 'production'];

/* Vendor dependencies to be bundled into VENDOR_CSS and VENDOR_JS
 * (and also files that should be copied such as fonts, images etc...) */
var VENDOR_DEPENDENCIES =
    [
        {
            name: 'hammerjs',
            jsFiles: [
                'hammer.js',
            ],
        },
        // {
        //     name: 'highcharts-release',
        //     jsFiles: [
        //         'highcharts.js',
        //     ],
        // },
    ];

/* Browserify options */
var BROWSERIFY_OPTS = {
    cache: {},
    packageCache: {},
    fullPaths: true,
    standalone: 'APP',
    entries: [JS_SRC + '/' + APP_JS],
    debug: true,
    ignoreMissing: true,
    transform: [
        [
            'mergeify',
            {
                files: ['config.json'],
                environment: 'local',
            },
        ],
        'babelify',
        [
            'detachkify',
            {
                relativeTo: path.join(__dirname, '/src'),
            },
        ],
    ],
};

var CSS_AUTOPREFIXER_OPTIONS = {
    browsers: ['> 1%', 'Safari 7.1'],
    cascade: false,
};

/* default task - invokes local task */
gulp.task('default', ['local']);

/* clean task - remove the demo folder */
gulp.task('clean', function(cb) {
    rimraf('./demo', cb);
});

/* task eslint - lints JavaScript source files using ESLint tool, this task will stop stream on errors */
gulp.task('eslint', function() {
    return gulp.src([JS_SRC + '/**/*.js', 'gulpfile.js'])
        .pipe(eslint({ configFile: '../../.eslintrc' }))
        .pipe(eslint.formatEach())
        .pipe(eslint.failAfterError());
});

/* less:build task - builds source less files into css */
gulp.task('less:build', function() {
    return gulp.src(LESS_SRC + '/app.less')
        .pipe(less())
        .on('error', onLessCompileError)
        .pipe(cssAutoPrefixer(CSS_AUTOPREFIXER_OPTIONS))
        .pipe(rename(APP_CSS))
        .pipe(gulp.dest(CSS_DEST));
});

/* less:build:ugly task - builds source less files into css and compresses them */
gulp.task('less:build:ugly', function() {
    return gulp.src(LESS_SRC + '/app.less')
        .pipe(less({ plugins: [cleanCSS] }))
        .on('error', onLessCompileError)
        .pipe(cssAutoPrefixer(CSS_AUTOPREFIXER_OPTIONS))
        .pipe(minifyCSS())
        .pipe(rename(APP_CSS))
        .pipe(gulp.dest(CSS_DEST));
});

/* less:rebuild task - invokes less:build task and then notifies livereload for change, used by watcher */
gulp.task('less:rebuild', ['less:build'], function(cb) {
    livereload.reload();

    if (cb) {
        cb();
    }
});

/* less:watch task - watches for changes on less files and invokes less:rebuild task */
gulp.task('less:watch', function() {
    return gulp.watch(LESS_SRC + '/**/*.less', ['less:rebuild']);
});

/* copy:assets task - copies assets */
gulp.task('copy:assets', function() {
    return gulp.src(ASSETS_SRC + '/**/*')
        .pipe(gulp.dest(ASSETS_DEST));
});

/* copy:vendors task - copies vendors */
gulp.task('copy:vendors', function() {
    return gulp.src(JS_VENDOR_SRC + '/**/*')
        .pipe(gulp.dest(JS_VENDOR_DEST));
});

/* copy:fonts task - copies css fonts */
gulp.task('copy:fonts', function() {
    return gulp.src('../css/dist/fonts/**/*')
        .pipe(gulp.dest(CSS_DEST + '/fonts'));
});

/* inject:template task - injects JavaScript and CSS tags specified in TEMPLATE_JS_FILES and TEMPLATE_CSS_FILES into
 * final index.html file */
gulp.task('inject:template', function() {
    return gulp.src(TEMPLATE_FILE)
        .pipe(inject(gulp.src(TEMPLATE_JS_FILES.concat(TEMPLATE_CSS_FILES), { read: false }), { ignorePath: 'demo' }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(COMPILED_TEMPLATE_FILE_DEST));
});

/* vendor task - copies specified vendor dependencies files */
gulp.task('vendor', function() {
    var vendorDepFiles = getVendorDependenciesFiles();

    gutil.log(gutil.colors.blue('Bundling vendor dependencies CSS...'), vendorDepFiles.cssFiles.length + ' file(s)');
    var cssStream = gulp.src(vendorDepFiles.cssFiles)
        .pipe(concatCSS(VENDOR_CSS))
        .pipe(gulp.dest(CSS_DEST));

    gutil.log(gutil.colors.blue('Bundling vendor dependencies JS...'), vendorDepFiles.jsFiles.length + ' file(s)');
    var jsStream = gulp.src(vendorDepFiles.jsFiles)
        .pipe(concat(VENDOR_JS))
        .pipe(gulp.dest(JS_DEST));

    var mergedStream = merge(cssStream, jsStream);

    gutil.log(gutil.colors.blue('Copying vendor dependencies other files...'), vendorDepFiles.otherFiles.length + ' item(s)');
    vendorDepFiles.otherFiles.forEach(function(file) {
        var otherStream = gulp.src(file.src)
            .pipe(gulp.dest(file.dest));

        mergedStream = merge(mergedStream, otherStream);
    });

    return mergedStream;
});

/* vendor:ugly task - copies specified vendor dependencies files and uglifies them if possible */
gulp.task('vendor:ugly', function() {
    var vendorDepFiles = getVendorDependenciesFiles();

    gutil.log(gutil.colors.blue('Bundling and minifying vendor dependencies CSS...'), vendorDepFiles.cssFiles.length + ' file(s)');
    var cssStream = gulp.src(vendorDepFiles.cssFiles)
        .pipe(concatCSS(VENDOR_CSS))
        .pipe(minifyCSS())
        .pipe(gulp.dest(CSS_DEST));

    gutil.log(gutil.colors.blue('Bundling and uglifying vendor dependencies JS...'), vendorDepFiles.jsFiles.length + ' file(s)');
    var jsStream = gulp.src(vendorDepFiles.jsFiles)
        .pipe(concat(VENDOR_JS))
        .pipe(uglify())
        .pipe(gulp.dest(JS_DEST));

    var mergedStream = merge(cssStream, jsStream);

    gutil.log(gutil.colors.blue('Copying vendor dependencies other files...'), vendorDepFiles.otherFiles.length + ' item(s)');
    vendorDepFiles.otherFiles.forEach(function(file) {
        var otherStream = gulp.src(file.src)
            .pipe(gulp.dest(file.dest));

        mergedStream = merge(mergedStream, otherStream);
    });

    return mergedStream;
});

SUPPORTED_ENVIRONMENTS.forEach(function(env) {
    // gulp root tasks - used for local development using local environment
    gulp.task(env,
        sequence('clean',
            'eslint', [
                'copy:assets',
                'copy:vendors',
                'copy:fonts',
                'vendor',
                'less:build',
                'js:build:' + env,
            ], [
                'inject:template',
                'less:watch',
            ], 'server')
    );

    /* deploy:local task - used for building on server using development environment */
    gulp.task('deploy:' + env,
        sequence('clean',
            'eslint', [
                'copy:assets',
                'copy:vendors',
                'copy:fonts',
                'vendor:ugly',
                'less:build:ugly',
                'js:deploy:' + env,
            ], [
                'inject:template',
            ])
    );

    // js:build tasks - bundles JavaScript source files with browserify using environment,
    // and creates source maps
    gulp.task('js:build:' + env, function() {
        var bundler = getBrowserify(env);
        return buildForDevelopment(bundler, APP_JS, APP_JS_DESTINATION);
    });

    // js:deploy tasks - bundles JavaScript source files with browserify using environment,
    // without source maps, and uglifies the bundle...
    gulp.task('js:deploy:' + env, function() {
        var bundler = getBrowserify(env, true);
        return buildForServer(bundler, APP_JS, APP_JS_DESTINATION);
    });
});

/* server task - starts server that serves files from 'demo' folder with the mod_rewrite middleware */
gulp.task('server', function() {
    livereload.listen();
    connect.server({
        root: 'demo',
        base: 'demo',
        port: 5555,
        middleware: function(lConnect) {
            return [
                modRewrite([
                    '\\.ico\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg|\\.ttf|\\.eot|\\.woff|\\.woff2$ - [L]',
                    'embed/index.html - [L]',
                    'embed(.*) embed/index.html$1 [L,R]',
                    '(.*) / [L]',
                ]),
                lConnect.static('demo'),
            ];
        },
    });
});

/* ====== HELPER FUNCTIONS ====== */
function getVendorDependenciesFiles() {
    var res = {
        jsFiles: [],
        cssFiles: [],
        otherFiles: [],
    };

    VENDOR_DEPENDENCIES.forEach(function(dep) {
        if (dep.hasOwnProperty('jsFiles')) {
            dep.jsFiles.forEach(function(jsFile) {
                res.jsFiles.push(NODE_MODULE_DIR + '/' + dep.name + '/' + jsFile);
            });
        }

        if (dep.hasOwnProperty('cssFiles')) {
            dep.cssFiles.forEach(function(cssFile) {
                res.cssFiles.push(NODE_MODULE_DIR + '/' + dep.name + '/' + cssFile);
            });
        }

        if (dep.hasOwnProperty('otherFiles')) {
            dep.otherFiles.forEach(function(otherFile) {
                otherFile.src = NODE_MODULE_DIR + '/' + dep.name + '/' + otherFile.src;
                res.otherFiles.push(otherFile);
            });
        }
    });

    return res;
}

function getBrowserify(env, withoutWatchify, browserifyOpts) {
    var browserifyOptions = browserifyOpts || BROWSERIFY_OPTS;
    browserifyOptions.transform[0][1].environment = env;

    if (withoutWatchify) {
        return browserify(browserifyOptions);
    }

    return watchify(browserify(browserifyOptions));
}

function buildForDevelopment(bundler, sourceFile, destinationFile) {
    var rebundleCallback = function(files) {
        if (files) {
            gutil.log(gutil.colors.blue.bold('Files changed:'));
            files.forEach(function(file) {
                gutil.log(gutil.colors.white(gutil.colors.yellow('\t>>> ') + file));
            });

            var lintStream = gulp.src(files)
                .pipe(eslint())
                .pipe(eslint.formatEach());
        }

        gutil.log(gutil.colors.blue.bold('Bundling of ' + destinationFile + ' started...'));
        var bundleStream = bundler.bundle()
            .on('error', function(err) {
                gutil.log(gutil.colors.bgRed(' Browserify Error '), err);
            })
            .pipe(mold.transformSourcesRelativeTo('./'))
            .pipe(source(sourceFile))
            .pipe(rename(destinationFile))
            .pipe(gulp.dest(JS_DEST))
            .pipe(livereload());

        return merge(lintStream, bundleStream);
    };

    bundler.on('update', rebundleCallback);
    bundler.on('log', function(msg) {
        gutil.log(gutil.colors.green.bold('Bundling of ' + destinationFile + ' finished!'), msg, '\n');
    });

    return bundler.bundle()
        .on('error', function(err) {
            gutil.log(gutil.colors.bgRed(' Browserify Error '), err);
        })
        .pipe(mold.transformSourcesRelativeTo('./'))
        .pipe(source(sourceFile))
        .pipe(rename(destinationFile))
        .pipe(gulp.dest(JS_DEST));
}

function buildForServer(bundler, sourceFile, destinationFile) {
    var banner = ['/**',
        ' * @name geobuffer',
        ' * @version v<%= pkg.version %>',
        ' */',
        ''].join('\n');
    return bundler.bundle()
        .on('error', function(err) {
            gutil.log(gutil.colors.bgRed(' Browserify Error '), err);
        })
        .pipe(source(sourceFile))
        .pipe(buffer())
        .pipe(uglify())
        .on('error', gutil.log.bind(gutil, gutil.colors.bgRed(' Uglify Error ')))
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename(destinationFile))
        .pipe(gulp.dest(JS_DEST));
}

function onLessCompileError(err) {
    gutil.log(gutil.colors.bgRed(' Error while compiling less file ') + '\n\n' +
        gutil.colors.white.underline(err.filename) + '\n' +
        '  ' + gutil.colors.white.dim(err.line) + '  ' + gutil.colors.red(err.type) + '  ' + gutil.colors.white(err.message) + '\n');
    this.emit('end');
    return this;
}
/* eslint-enable no-var,block-scoped-var,no-use-before-define,vars-on-top,object-shorthand */
