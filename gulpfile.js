var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass   = require('gulp-ruby-sass');
var exec   = require('child_process').exec;

var paths = {
    scripts: {
        application: [
            'assets/javascripts/angular/app.js',
            'assets/javascripts/angular/config.js',
            'assets/javascripts/angular/services/*.js',
            'assets/javascripts/angular/controllers/*.js',
            'assets/javascripts/application.js',
            'assets/javascripts/modules/*.js',
            'assets/javascripts/init.js'
        ],
        vendor: [
            'vendor/respond/dest/respond.src.js',
            'vendor/jquery/dist/jquery.js',
            'vendor/console-polyfill/index.js',
            'vendor/moment/moment.js',
            'vendor/angular/angular.js',
            'vendor/angular-resource/angular-resource.js',
            'vendor/angular-route/angular-route.js',
            'vendor/angular-animate/angular-animate.js'
        ]
    },
    styles: {
        application: 'assets/stylesheets/**/*.scss',
        vendor: [
            'vendor/bootstrap/vendor/assets/stylesheets/',
            'vendor/bourbon/dist/'
        ]
    },
    specs: {
        client: 'spec/client/**/*.js',
        integration: 'spec/integration/**/*.js',
        server: 'spec/server/**/*.rb'
    },
    server: [
        'app.rb',
        'config.ru',
        'lib/**/*.rb'
    ]
};

gulp.task('scripts', function () {
    return gulp.src(paths.scripts.vendor.concat(paths.scripts.application))
        .pipe(uglify().on('error', function(e) { console.log('x07', e.message, e.fileName, e.lineNumber); return this.end();}))
        .pipe(concat('application.min.js'))
        .pipe(uglify({ outSourceMap: false }))
        .pipe(gulp.dest('public/javascripts/'));
});

gulp.task('jshint', function () {
    return gulp.src(paths.scripts.application)
        .pipe(jshint());
});

gulp.task('styles', function () {
    return gulp.src(paths.styles.application)
        .pipe(sass({
            loadPath: paths.styles.vendor,
            style: 'compressed'
        }))
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('server', function () {
    var server = exec('foreman start', function (error, stdout, stderr) {
        if (error) {
            console.error('exec error:', error);
        } else if (stderr) {
            console.error(stderr);
        }
        console.log(stdout);
    });
    server.stdout.on('data', function (message) {
        console.log(message);
    });
    server.stderr.on('data', function (error) {
        console.error(error);
    });
    return server;
});

gulp.task('rspec', function () {
    return exec('bundle exec rspec -I spec/server --color', function (error, stdout, stderr) {
        if (error) {
            console.error('exec error:', error);
        } else if (stderr) {
            console.error(stderr);
        }
        console.log(stdout);
    });
});


gulp.task('karma', function () {
    return exec('karma start --singleRun=true', function (error, stdout, stderr) {
        if (error) {
            console.error('exec error:', error);
        } else if (stderr) {
            console.error(stderr);
        }
        console.log(stdout);
    });
});

gulp.task('protractor', function () {
    return exec('./node_modules/protractor/bin/protractor', function (error, stdout, stderr) {
        if (error) {
            console.error('exec error:', error);
        } else if (stderr) {
            console.error(stderr);
        }
        console.log(stdout);
    });
});

gulp.task('default', ['jshint', 'scripts', 'styles']);

gulp.task('watch', function () {
    gulp.start('server');

    gulp.watch(paths.styles.application, ['styles']);
    gulp.watch(paths.styles.vendor, ['styles']);
    gulp.watch(paths.scripts.application, ['jshint', 'scripts']);
    gulp.watch(paths.scripts.vendor, ['scripts']);
    gulp.watch(paths.scripts.vendor.concat(paths.scripts.application), ['karma']);
    gulp.watch([].concat(
        paths.scripts.vendor,
        paths.scripts.application,
        paths.specs.integration
    ), ['protractor']);
    gulp.watch(paths.server.concat(paths.specs.server), ['rspec']);
});
