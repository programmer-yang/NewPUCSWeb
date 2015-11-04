'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');


gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["./views/***/*.html","./public/**/*.*"],
        browser: "google chrome",
        port: 3001,
    });
});
//gulp.task('nodemon', function (cb) {
//
//    var started = false;
//
//    return nodemon({
//        //script: 'app.js'
//        script: 'bin/www'
//    }).on('start', function () {
//        // to avoid nodemon being started multiple times
//        // thanks @matthisk
//        if (!started) {
//            cb();
//            started = true;
//        }
//    });
//});
