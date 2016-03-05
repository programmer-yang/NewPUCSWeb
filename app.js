var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bunyan = require('bunyan');
var log = bunyan.createLogger(require('./bunyan-config.json').log);

var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

var routes = require('./routes/index');
var api = require('./routes/api/api');


var look = require('./routes/filter/look');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.locals.trimValue = function (data, option) {
  //console.log(data+':'+option);
  var result = data;
  if (data && option) {

    if (typeof option.forEach == 'function') {
      option.forEach(function (para) {

        if (result[para] && result[para] != 'false') {
          result = result[para];
        } else {
          result = '';
        }
      });
    }
  }
  return result;
};
app.locals.trimArray = function (data, option) {
  var result = [];
  if(data) {
    if (typeof data.forEach == 'function') {
      data.forEach(function(data, key) {
        if(option) {
          result[key] = data[option];
        }else {
          result[key] = data;
        }

      });
    }
  }
  return result;
};

app.locals.selected = function ($) {
  console.log($);
};

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: 'mySession',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  //console.log(req.log);
  req.log=log;
  //console.log(req.log);
  next();
});

/**
 * 加载权限过滤中间件
 */
app.use(look.look);


app.use('/', routes);
app.use('/', api);
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
    console.log('404');

    //res.redirect('/error');
    //res.status(err.status || 500);
    res.render('error/404');
    res.end();
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

//
///**
// * 启动
// */
//

//var server = app.listen(3001, function () {
//
// var host = server.address().address;
// var port = server.address().port;
//
// console.log('Example app listening at http://%s:%s', host, port);
//});


module.exports = app;
