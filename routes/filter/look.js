var access = require('./../tool/access');



/**
 * 权限过滤
 */
function look(req, res, next) {
    //console.log('look 666');
    //console.log(req.url);

    ///**
    // * 开发中不开启过滤
    // */
    //next();

    var url = req.url;

    if (url === '/login') {
        next();
    } else {
        /**
         *验证权限
         */
        //var b = false;
        var b = true;
        console.log('开始验证权限 ***************** ');
        var key = req.cookies.key;
        var mySession = req.session.mysession;


        if(key && mySession && key == mySession.id) {

            b = true;

            if((new Date()).getTime() > mySession.cookie.expire) {

                //console.log('timeout ************'+'');
                mySession.cookie.expire = access.getNewTime();

                req.session.mySession = mySession;


                /**
                 * 2015-10-15 18:14
                 * 记录下此刻的想法
                 * 目前这个验证设计是这样的
                 * 当用户登录以后，会在session中保存一个key和一个到期时间
                 * 并在cookie中保存这个key
                 * 每次用户的请求都会对比cookie和session中的这个key，当相等切在有效期内的时候表示登陆正常
                 * 当key相等，但key有效期到了，就续key有效期（这里是否生成新的key需要思考）
                 * 否则都执行登陆操作
                 */
            }
        }

        if (b) {
            if(url === '/') {
                res.redirect('/index');
            }else{
                next();
            }
        } else {
            res.redirect('/login');
        }
    }

}


exports.look = look;


