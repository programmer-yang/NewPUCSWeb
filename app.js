var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');


var routes = require('./routes/index');


var look = require('./routes/filter/look');


/**
 * browserSync
 */
//var gulp        = require('gulp');
//var browserSync = require('browser-sync').create();

//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'mySession'}));
app.use(express.static(path.join(__dirname, 'public')));


/**
 * 加载权限过滤中间件
 */
app.use(look.look);


app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.log('error');

        //res.redirect('/error');
        res.status(err.status || 500);
        res.render('error/404');
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


/**
 * 启动
 */


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});




//// 静态服务器
//gulp.task('browser-sync', function() {
//    browserSync.init({
//        server: {
//            baseDir: "./views/login/*.html"
//        }
//    });
//});
//
//// 代理
//
//gulp.task('browser-sync', function() {
//    browserSync.init({
//        proxy: "http://localhost:3000"
//    });
//});

module.exports = app;
