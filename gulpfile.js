'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var minifyCss = require('gulp-minify-css');


gulp.task('default', ['browser-sync'], function () {
});
//gulp.task('default', ['minifycss'], function () {
//});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["./views/***/*.html","./public/**/*.*"],
        browser: "google chrome",
        port: 3001,
    });
});




////压缩css
//gulp.task('minifycss',function() {
//    return gulp.src('public/stylesheets/site.css')    //需要操作的文件
//        .pipe(minifyCss())   //执行压缩
//        .pipe(gulp.dest('public/stylesheets/css'));   //输出文件夹
//});

//压缩css
//gulp.task('minifycss',function() {
//    return gulp.src('public/stylesheets/vendor/datetimepicker/bootstrap-datetimepicker.css')    //需要操作的文件
//        .pipe(minifyCss())   //执行压缩
//        .pipe(gulp.dest('public/stylesheets/vendor/datetimepicker/min/'));   //输出文件夹
//});


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
