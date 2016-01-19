var request = require('request');
var util = require('./util');
//request = request.defaults({jar: true});
//var j = request.jar();


var option = {

    //ip: 'http://192.168.1.168',
    //port: '80',

    ip: 'http://192.168.1.222',
    port: '3003',


    trim: function (describe) {
        var result = this.ip;
        if (this.port) {
            result += ':' + this.port;
        }
        if (describe) {
            result += describe;
        }
        return result;
    }

};


exports.get = function (describe, req, back) {

    //console.log(req.cookies);
    console.log('get : '+option.trim(describe));

    request.get(option.trim(describe), function (err, response, body) {
        if (typeof back === 'function') {
            back(err, response, body);
        }
    });

};


exports.post = function (describe, data, back, res) {

    console.log(option.trim(describe));

    request.post(option.trim(describe), {form: JSON.stringify(data), timeout: 20000}, function (err, response, body) {
        if (typeof back === 'function') {

            back(err, response, body);

        }
    });

};

exports.local = {
    get: function (describe, req, back) {
        var url = 'http://localhost:3000';
        //console.log(url+describe);
        //
        //
        //url += describe;
        //var myCookie = request.cookie('key='+req.cookies.key);
        //j.setCookie(myCookie, url);

        //request.cookie('key=' + req.cookies.key);

        url +=describe;
        if(req.query) {
            url = util.trimGetParameter(url,req.query);
        }
        console.log(url);
        request.get(url, function(err, response, body) {
            //response.statusCode
            //此处是否处理status
            //...
            back(body);
        });
    },
    post: function (describe, data, back) {
        var url = 'http://localhost:3000';
        console.log(url+describe);
        console.log(data);
        request.post(url+describe, {form: data, timeout: 30000}, function(err, response, body) {
            //response.statusCode
            //此处是否处理status
            //...
            back(body);
        });
    }
};