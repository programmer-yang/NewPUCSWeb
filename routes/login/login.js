var access = require('./../tool/access');
var languages = require('./../../config/language');

var emitter = require('../tool/emitter');
var ef = require('../tool/errors');
var util = require('../tool/util');

var EventProxy = require('eventproxy');

var apiLogin = require('../api/apiLogin');


/**
 * 根目录请求
 */
function loginGet(req, res, next) {



  /*
   更目录“ / ” 请求拦截，这里应该做“是否已登陆”验证
   */


  var lg = req.cookies.lg || 'us';
  var describe = languages.get('login', lg);


  res.render('login/login', {lg: describe});

}


/**
 * 登陆页面请求
 */
function loginPost(req, res, next) {

  var ep = new EventProxy();

  ep.all('login', function(login){


      access.register(req, res, {
        access_token: login.access_token,
        expires: login.expires,
        role: login.role,
      });

    req.log.info('login success');
    req.log.info(req.body);
    req.log.info('access_token : ' + login.access_token);
      res.json({result: 'success', url: 'index', permissions: login.permissions});
      res.end();

  });
  ep.fail(function(err){
    //待完成
    req.log.error('login error');
    req.log.error('err : ' + err);
    res.json({result: 'error', msg: err.msg});
    res.end();
  });


  req.log.info('login');
  apiLogin.login(req.body, util.done('login', ep, 'Login failed'));




  //emitter.local.post('/api/account/credentials/verify', req.body, function (data) {
  //
  //  if (typeof data === 'undefined') {
  //    ef.getError('500', '500', res);
  //    return;
  //  }
  //  var dataJson = util.parseJSON(data);
  //  if (dataJson.err_code) {
  //    //console.log('6646546321');
  //    //console.log(dataJson);
  //    //console.log(dataJson.msg);
  //    //console.log(dataJson.err_code);
  //    res.json({result: 'error', url: 'login', message: dataJson.msg});
  //    //ef.getError('400','')
  //    return;
  //  }
  //
  //  access.register(req, res, {
  //    access_token: dataJson.access_token,
  //    expires: dataJson.expires,
  //    role: dataJson.role,
  //  });
  //
  //  res.json({result: 'success', url: 'index', permissions: dataJson.permissions});
  //  res.end();
  //
  //});



  //console.log('post body');
  //console.log(req.body);
  //
  //
  //var data = req.body;
  //
  //var username = data.username;
  //var password = data.password;
  //
  ////console.log('sayhi.get');
  ////sayhi.test(function(data){console.log(data);});
  //console.log('执行登陆');
  //console.log('/api/account/credentials/verify');
  //
  ////emitter.port('/account/verify_credentials', function(req, res, next){
  ////
  ////});
  //
  ////res.redirect('/account/verify_credentials');
  //
  //
  //emitter.local.post('/api/account/credentials/verify', req.body, function (data) {
  //
  //  if (typeof data === 'undefined') {
  //    ef.getError('500', '500', res);
  //    return;
  //  }
  //  var dataJson = util.parseJSON(data);
  //  if (dataJson.err_code) {
  //    //console.log('6646546321');
  //    //console.log(dataJson);
  //    //console.log(dataJson.msg);
  //    //console.log(dataJson.err_code);
  //    res.json({result: 'error', url: 'login', message: dataJson.msg});
  //    //ef.getError('400','')
  //    return;
  //  }
  //
  //  access.register(req, res, {
  //    access_token: dataJson.access_token,
  //    expires: dataJson.expires,
  //    role: dataJson.role,
  //  });
  //
  //  res.json({result: 'success', url: 'index', permissions: dataJson.permissions});
  //  res.end();
  //
  //});
  //
  //
  //if (test(username, password)) {
  //
  //
  //} else {
  //
  //}


  //res.end();


}


/**
 * 显示首页
 */
function indexGet(req, res, next) {

  var lg = req.cookies.lg || 'us';
  var describe = languages.get('main', lg);

  console.log(describe);
  console.log('show main page');
  res.render('index', {lg: describe, role: req.session.mysession.role});

}


/**
 * 临时测试方法
 * 仅供开发使用
 * @param username
 * @param password
 * @returns {boolean}
 */
function test(username, password) {
  console.log(username + ':' + password);
  if (username === 'admin' && password === 'admin')
    return true;
  else
    return false;
}


exports.loginGet = loginGet;
exports.loginPost = loginPost;

exports.indexGet = indexGet;