var gulp = require('gulp');

var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');

var browserify = require("browserify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');

sass.compiler = require('node-sass');

// config
var paths = {
    sass: {
        src: './furniture/sass/**/*.{scss,sass}',
        dest: './furniture/css',
        opts: {

        }
    }
};

// Convert scss to css
gulp.task('scss', function(done) {
    gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
    done();
});

// Minify the css
gulp.task('mincss', function(done) {
    gulp.src('./css/*.css')
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(gulp.dest('./dist/'));
    done();
});

// Js Bundling
gulp.task('bundlejs', function(done) {
    browserify({ debug: true })
        .transform(babelify.configure({
            presets: ['@babel/env']
        }))
        .require("./js/tetris.js", { entry: true })
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source("tetris.js"))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dist/'));
    done();
});

gulp.task('run', gulp.series(['scss', 'mincss', 'bundlejs']));

gulp.task('watch', function() {
    gulp.watch('./scss/*.scss', gulp.series(['scss']));
    gulp.watch('./css/*.css', gulp.series(['mincss']));
    gulp.watch('./js/**/*.js', gulp.series(['bundlejs']));
});

// // Run Gulp to run and watch the changes
gulp.task('default', gulp.series('run', 'watch'));