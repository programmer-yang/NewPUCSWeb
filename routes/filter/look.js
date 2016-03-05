var access = require('./../tool/access');
var emitter = require('../tool/emitter');
var util = require('../tool/util');
var api = require('../api/api');
var apiLogin = require('../api/apiLogin');
var EventProxy = require('eventproxy');


/**
 * 权限过滤
 */
function look(req, res, next) {
  var ep = new EventProxy();

  //console.log('*******************');
  //console.log(api);
  //console.log('*******************');


  var url = req.url;

  console.log(url);

  //|| url.indexOf('/api') >= 0)
  if (url == '/login' || url == '/api/account/credentials/verify') {
    next();
  } else {

    var access_token = req.cookies.access_token;
    if(!access_token) {
      /**
       * 当cookie中拿不到token的时候，尝试在参数列表中获取
       * 考虑cookie被禁用的情况
       */
      access_token = req.query.access_token;
      if(!access_token)
        access_token = req.body.access_token;
    }
    var mySession = req.session.mysession;

    if (access_token && mySession && access_token == mySession.id) {


      /**
       * 验证通过后，是否在这里改变参数列表中的access_token？
       */
      var mySession = req.session.mysession;
      if(req.method == 'GET') {
        if(mySession && mySession.access_token) {
          req.query.access_token = mySession.access_token;
        }
      }else if(req.method == 'POST') {
        if(mySession && mySession.access_token) {
          req.body.access_token = mySession.access_token;
        }
      }

      myKey = mySession.id;

      console.log('超时检查 -- 测试使用(以后要删除)');
      console.log('当前 token : ' + mySession.id);
      console.log('当前 access_token : ' + mySession.access_token);
      console.log('剩余有效期(s) : ' + (mySession.cookie.warning-(new Date()).getTime())/1000);
      if ((new Date()).getTime() > mySession.cookie.warning) {

        req.body.access_token = mySession.access_token;
        console.log('执行续时操作');

        ep.all('trData', function(trData) {
          trData = util.parseJSON(trData);

          if(trData.err_code) {
            //res.redirect('/login');
            res.json({
              err_code: '500',
              msg: trData.msg || 'Access_token is error,Please log in again',
              url:'/login'
            });
          }else if(trData.expires && !isNaN(trData.expires)) {
            //console.log(data);
            //  续时成功

            access.register(req, res, {
              access_token: mySession.access_token,
              expires: trData.expires,
              role: mySession.role,
            });
            console.log(trData);
            console.log('续时成功');
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
            next();
          }else {
            /**
             * 续时异常，如果到这里请检查 /api/account/token/refresh 返回的结果是否正确
             */
            console.error('Abnormal renewal');
          }
        });

        ep.fail(function(err) {
          console.log('token refresh error');
          var result = {};
          result['url'] = 'login';
          result['err_code'] = '500';
          result['msg'] = err.msg;
          res.json(result).end();

        });

        apiLogin.tokenRefresh(req.body, util.done('trData', ep, 'Token Refresh ERROR'));
        //emitter.local.post('/api/account/token/refresh', req.body, function(data) {
        //  data = util.parseJSON(data);
        //
        //  if(data.err_code) {
        //    //res.redirect('/login');
        //    res.json({
        //      err_code: '500',
        //      msg: data.msg || 'Access_token is error,Please log in again',
        //      url:'/login'
        //    });
        //  }else if(data.expires && !isNaN(data.expires)) {
        //    //console.log(data);
        //      //  续时成功
        //
        //    access.register(req, res, {
        //      access_token: mySession.access_token,
        //      expires: data.expires,
        //      role: mySession.role,
        //    });
        //    console.log(data);
        //    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        //    next();
        //  }else {
        //    /**
        //     * 续时异常，如果到这里请检查 /api/account/token/refresh 返回的结果是否正确
        //     */
        //    console.error('Abnormal renewal');
        //  }
        //});



      }else{
        next();
      }
    } else {

      if (url == '/index' || url == '/') {
        res.redirect('/login');
      } else {
        console.log('TIME_OUT');
        res.json({result: 'TIME_OUT', url: '/login', err_code: '404', msg: 'Connect to a server error'}).end();
      }


    }


  }


}


exports.look = look;


