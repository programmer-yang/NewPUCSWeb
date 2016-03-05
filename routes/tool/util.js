
exports.trimGetParameter = function (url, pars) {

  if (url && pars) {

    if (url.indexOf('?') < 0) {
      url += '?';
    } else {
      url += '&';
    }
    for (var o in pars) {
      url += o + '=' + pars[o] + '&';
    }
  }
  if (url.lastIndexOf('&') == (url.length - 1)) {
    url = url.substr(0, (url.length - 1));
  }

  return url;

};


function parseJSON (str) {
  var result = str;
  if(typeof str == 'string') {
    try {
      var result = {
        err_code: '500',
        msg: 'Abnormal returns the result format -- ' + str
      };
      if (str && str.indexOf('{') == 0 && str.lastIndexOf('}') == str.length - 1) {
        result = JSON.parse(str);
      }
    } catch(err) {
      return result;
    }
  }
  return result;
};

exports.done = function(name, proxy, errorMsg, res) {
  return function(err,data) {
    data = parseJSON(data);
    if(err) {
      proxy.emit('error', err, errorMsg);
      return;
    }
    if(data && data.err_code) {
      proxy.emit('error', data, errorMsg);
      return;
    }
    if(data && data.result == 'error') {
      proxy.emit('error', data, errorMsg);
      return;
    }
    /**
     * 应该还需优化一下这里的逻辑，避免未知的错误
     */
    if(data) {
      proxy.emit(name, data, res);
      return;
    }
  }
};


exports.parseJSON = parseJSON;