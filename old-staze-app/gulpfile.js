/* eslint-disable no-var,block-scoped-var,no-use-before-define,vars-on-top,object-shorthand */
var gulp = require('gulp');
// var concat = require('gulp-concat');
var rename = require('gulp-rename');
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
var pkg = require('./package.json');
// var version = pkg.version;

/* Node module directory */
// var NODE_MODULE_DIR = './node_modules';

var APP_CSS = 'app.css';
var APP_JS_ENTRY_POINT = 'app.js';
var APP_JS_DESTINATION = 'app.js';

/* Build source paths */
var JS_SRC = './src';
var LESS_SRC = './src/less';
var ASSETS_SRC = './assets';

/* Build destination paths */
var JS_DEST = './dist/js';
var CSS_DEST = './dist/css';
var ASSETS_DEST = './dist';

/* Browserify options */
var BROWSERIFY_OPTS = {
    cache: {},
    packageCache: {},
    fullPaths: true,
    standalone: 'App',
    entries: [path.join(JS_SRC, APP_JS_ENTRY_POINT)],
    debug: true,
    ignoreMissing: true,
    transform: [
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

/* default task - invokes development task */
gulp.task('default', ['dev']);

/* clean task - remove the dist folder */
gulp.task('clean', function(cb) {
    rimraf('./dist', cb);
});

/* task eslint - lints JavaScript source files using ESLint tool, this task will stop stream on errors */
gulp.task('eslint', function() {
    return gulp.src([JS_SRC + '/**/*.js', 'gulpfile.js'])
        .pipe(eslint({ useEslintrc: true, configFile: './.eslintrc' }))
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

/* examples:watch task - watches for changes on example files and invokes copy:examples task */
gulp.task('assets:watch', function() {
    return gulp.watch(ASSETS_SRC + '/**/*', ['copy:assets']);
});

gulp.task('dev',
    sequence('clean',
        'eslint', [
            'copy:assets',
            'less:build',
            'js:build:development',
        ], [
            'less:watch',
            'assets:watch',
        ], 'server')
);

gulp.task('build',
    sequence('clean',
        'eslint', [
            'copy:assets',
            'less:build:ugly',
            'js:build:production',
        ])
);

// js:build tasks - bundles JavaScript source files with browserify using environment,
// and creates source maps
gulp.task('js:build:development', function() {
    var bundler = getBrowserify('development');
    return buildForDevelopment(bundler, APP_JS_ENTRY_POINT, APP_JS_DESTINATION);
});

// js:build tasks - bundles JavaScript source files with browserify using environment,
// without source maps, and uglifies the bundle...
gulp.task('js:build:production', function() {
    var bundler = getBrowserify('production', true);
    return buildForServer(bundler, APP_JS_ENTRY_POINT, APP_JS_DESTINATION);
});

/* server task - starts server that serves files from 'demo' folder with the mod_rewrite middleware */
gulp.task('server', function() {
    livereload.listen();
    connect.server({
        root: 'dist',
        base: 'dist',
        port: 5000,
        middleware: function(lConnect) {
            return [
                modRewrite([
                    '\\.ico|\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg|\\.ttf|\\.eot|\\.woff|\\.woff2|\\.pbf|\\.xml$ - [L]',
                    '(.*) / [L]',
                ]),
                lConnect.static('dist'),
            ];
        },
    });
});

/* ====== HELPER FUNCTIONS ====== */
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
        ' * @name MapSpice UI React Demo',
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
