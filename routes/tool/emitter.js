var request = require('request').defaults({
  strictSSL: false,
  rejectUnauthorized: false,
});
var util = require('./util');
//request = request.defaults({jar: true});
//var j = request.jar();


var option = {

  ip: 'https://192.168.1.28',
  port: '8898',

  //ip: 'http://192.168.1.168',
  //port: '80',
  ////
  //ip: 'http://192.168.1.222',
  //port: '3003',


  localhost: 'http://localhost:3000',


  trim: function (describe, paras) {
    var result = this.ip;
    if (this.port) {
      result += ':' + this.port;
    }
    if (describe) {
      result += describe + '?';
    }
    if (paras) {
      for (var o in paras) {
        result += o + '=' + paras[o] + '&';
      }
    }
    if (result.substr(result.length - 1) == '&' || result.substr(result.length - 1) == '?') {
      result = result.substr(0, result.length - 1);
    }
    return result;
  }

};
var option_voice_mail = {

  //ip: 'https://192.168.1.28',
  //port: '8890',
  //
  ip: 'http://192.168.1.168',
  port: '8890',
  ////
  //ip: 'http://192.168.1.222',
  //port: '3003',


  localhost: 'http://localhost:3000',


  trim: function (describe, paras) {
    var result = this.ip;
    if (this.port) {
      result += ':' + this.port;
    }
    if (describe) {
      result += describe + '?';
    }
    if (paras) {
      for (var o in paras) {
        result += o + '=' + paras[o] + '&';
      }
    }
    if (result.substr(result.length - 1) == '&' || result.substr(result.length - 1) == '?') {
      result = result.substr(0, result.length - 1);
    }
    return result;
  }

};


exports.get = function (url, data, back) {

  //console.log(req.cookies);
  url = option.trim(url, data);

  console.log(url);

  request.get(url, function (err, response, body) {
    console.log('GET : ' + body);
    if (typeof back === 'function') {
      back(err, body);
    }
  });

};
exports.post = function (url, data, back) {

  var options = {
    uri: option.trim(url),
    method: 'POST',
    json: data,
    timeout: 20000,
  };
  console.log(options.uri);
  console.log(options.json);
  request(options, function (err, response, body) {

    console.log('POST : ' + typeof body == 'object' ? JSON.stringify(body) : body);
    if (!body) {
      if (response && response.statusCode == '200') {
        body = {
          result: 'success',
        }
      }
    }

    if (typeof back === 'function') {
      back(err, body);
    }
  });
};

exports.voiceMail = {
  get: function (url, data, back) {
    url = option_voice_mail.trim(url, data);

    console.log(url);

    request.get(url, function (err, response, body) {
      console.log('GET : ' + body);
      if (typeof back === 'function') {
        back(err, body);
      }
    });
  },
  post: function (url, data, back) {
    var options = {
      uri: option_voice_mail.trim(url),
      method: 'POST',
      json: data,
      timeout: 20000,
    };
    console.log(options.uri);
    console.log(options.json);
    request(options, function (err, response, body) {

      console.log('POST : ' + typeof body == 'object' ? JSON.stringify(body) : body);
      if (!body) {
        if (response && response.statusCode == '200') {
          body = {
            result: 'success',
          }
        }
      }

      if (typeof back === 'function') {
        back(err, body);
      }
    });
  }
};

exports.local = {
  get: function (describe, req, back) {
    var url = option.localhost;
    //console.log(url+describe);
    //
    //
    //url += describe;
    //var myCookie = request.cookie('key='+req.cookies.key);
    //j.setCookie(myCookie, url);

    //request.cookie('key=' + req.cookies.key);

    url += describe;
    if (req.query) {
      url = util.trimGetParameter(url, req.query);
    }
    request.get(url, function (err, response, body) {
      //response.statusCode
      //此处是否处理status
      //...
      back(err, body);
    });
  },
  post: function (describe, data, back) {
    var url = option.localhost;
    data.local_token = 'abc';
    request.post(url + describe, {form: data, timeout: 30000}, function (err, response, body) {
      //response.statusCode
      //此处是否处理status
      //...

      back(body);
    });
  }
};