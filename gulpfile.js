var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var recess = require('gulp-recess');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');

gulp.task("js", function() {
    gulp.src(["app/**/*.js"])            // Read the files
        .pipe(concat("main.js"))   // Combine into 1 file
        .pipe(gulp.dest("js"))            // Write non-minified to disk
        .pipe(uglify())                     // Minify
        .pipe(rename({extname: ".min.js"})) // Rename to ng-quick-date.min.js
        .pipe(gulp.dest("js"))            // Write minified to disk
});

gulp.task("less", function() {
    gulp.src('less/style.less')
        .pipe(recess())
        .pipe(less({
            sourceMap: true,
            sourceMapFilename: 'style.min.map',
            sourceMapURL: '../less/',
            sourceMappingURL: '../less'
        }))
		.pipe(minifyCSS())
        .pipe(gulp.dest('css'));
});



gulp.task("default", function() {
    gulp.start("js");
    gulp.start("less");
    gulp.watch([
        'app/**'
    ], function (event) {
        gulp.run('js');
    });
    gulp.watch([
        'less/**'
    ], function (event) {
        gulp.run('less');
    });
});

