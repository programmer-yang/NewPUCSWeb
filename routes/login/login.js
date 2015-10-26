var access = require('./../tool/access');
var languages = require('./../../config/language');
var zmanage = require('./../../zmq/zmqManage');


/**
 * 根目录请求
 */
function loginGet(req, res, next) {



    /*
     更目录“ / ” 请求拦截，这里应该做“是否已登陆”验证
     */


    var lg = req.cookies.lg || 'us';
    var describe = languages.get('login',lg);


    res.render('login/login',{lg:describe});

}


/**
 * 登陆页面请求
 */
function loginPost(req, res, next) {


    var data = req.body;

    var username = data.username;
    var password = data.password;

    /*
    使用ZMQ到PBX上做校验
     */
    var loginReq = {"op":"getValidOperator","page":"settings","operator":username,"password":password}
    zmanage.send('pbx', loginReq, function(data){

        console.log('zmq callback 666');
        if(data.type != 'error'){
            if(data.result == 'true'){
                //设置session
                req.session.mysession = access.generate();
                res.cookie('key', req.session.mysession.id, {maxAge: 1000 * 60 * 10});

                res.json({result: 'success', url: 'main'});
                res.end();
            }else{
                res.json({result: 'error', url: 'login', message: 'The user name or password error'});
                res.end();
            }
        }else{
            res.json({result: 'error', url: '404', message: 'Network problems'});
            res.end();
        }
    });

    if (test(username, password)) {


    }else{

    }


    //res.end();


}



/**
 * 显示首页
 */
function mainGet(req, res, next) {


    var lg = req.cookies.lg || 'us';
    var describe = languages.get('main',lg);

    console.log(describe);
    console.log('show main page');
    res.render('index', {lg: describe});

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

exports.mainGet = mainGet;