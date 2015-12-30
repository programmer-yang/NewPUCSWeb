var request = require('request');


var option = {

    //ip: 'http://192.168.1.168',
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


exports.get = function (describe, back) {

    request.get(option.trim(describe), function (err, response, body) {
        if (typeof back === 'function') {
            back(err, response, body);
        }
    });

};


exports.post = function (describe, data, back, res) {

    console.log(option.trim(describe));

    request.post(option.trim(describe), {form: JSON.stringify(data), timeout: 10000}, function (err, response, body) {
        if (typeof back === 'function') {
            back(err, response, body);
        }
    });

};

exports.local = {
    get: function (describe, back) {},
    post: function (describe, data, back) {
        var url = 'http://localhost:3000';
        console.log(url+describe);
        console.log(data);
        request.post(url+describe, {form: data, timeout: 15000}, function(err, response, body) {
            //response.statusCode
            //此处是否处理status
            //...
            back(body);
        });
    }
};