var gulp = require('gulp'),
// common
    lr = require('tiny-lr'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
//connect = require('connect'),
//serveStatic = require('serve-static'),
    server = lr(),
// css
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
// js
    uglify = require('gulp-uglify')
    ;

var modRewrite = require('connect-modrewrite');
var express = require('express');
var vhost = require('vhost');
//var proxy = require('express-http-proxy');
var proxyMiddleware = require('http-proxy-middleware');

var jsPaths = [
    './bower_components/angular/angular.min.js',
    './assets/js/_jquery-1.11.0.min.js',
    './assets/js/bootstrap.min.js',
    './assets/js/device.min.js',
    './assets/js/controls.js'
];

// Js
gulp.task('js', function(){
    gulp.src(jsPaths)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./sait/js'))
        .pipe(livereload(server));
});




// Css
gulp.task('less', function () {
    gulp.src('./assets/less/_common.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(concat('style.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./sait/css'))
        .pipe(livereload(server));
});
// Watch
gulp.task('watch', function() {
        server.listen(35729, function(err) {
        if (err) return console.log(err);

        gulp.watch(['./assets/less/**/*.css'],['less']);
        gulp.watch(['./assets/js/**/*.js'],['js']);
    });
    gulp.run('local-serverRu');
});
// Local server
gulp.task('local-serverRu',
    function() {
        express()
            .use(vhost('fire.local', express.static("sait")))
            .listen('9360');
        console.log('12312');
    });

gulp.task('default', function() {
    gulp.run('watch');
});