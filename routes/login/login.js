var access = require('./../tool/access');
var languages = require('./../../config/language');
//var zmanage = require('./../../zmq/zmqManage');


//var emitter = require('../tool/emitter');
var emitter = require('../tool/emitter');
var ef = require('../tool/errors');

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


    console.log('post body');
    console.log(req.body);


    var data = req.body;

    var username = data.username;
    var password = data.password;

    //console.log('sayhi.get');
    //sayhi.test(function(data){console.log(data);});
    console.log('执行登陆');
    console.log('/account/verify_credentials');

    //emitter.port('/account/verify_credentials', function(req, res, next){
    //
    //});

    //res.redirect('/account/verify_credentials');


    emitter.local.post('/account/verify_credentials', req.body, function (data) {

        //console.log('22222');
        //console.log(typeof data);
        //console.log(data);

        if(typeof data === 'undefined') {
            ef.getError('500', '500', res);
            return;
        }



        var dataJson = JSON.parse(data);
        if (dataJson.err_code) {
            console.log('6646546321');
            console.log(dataJson);
            console.log(dataJson.msg);
            console.log(dataJson.err_code);
            res.json({result: 'error', url: 'login', message: dataJson.msg});
            //ef.getError('400','')
            return;
        }

        //console.log('session ====');
        //console.log(req.session);

        req.session.mysession = access.generate();
        req.session.mysession.access_token = dataJson.access_token;
        req.session.mysession.role = dataJson.role;


        var expires = dataJson.expires;
        var permissions = dataJson.permissions;
        var role = dataJson.role;



        console.log('------------');
        console.log(req.session.mysession);

        res.cookie('key', req.session.mysession.id, {maxAge: (1000 * 60 * 10)});

        res.json({result: 'success', url: 'index', permissions: dataJson.permissions});
        res.end();
        //
        //if (typeof(data) === 'object') {
        //}else{
        //    ef.getError('500','500',res);
        //    return;
        //
        //}



    });



    if (test(username, password)) {


    } else {

    }


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
    res.render('index', {lg: describe,role: req.session.mysession.role});

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