

exports.trimGetParameter = function(url,pars) {

    if(url && pars) {

        if(url.indexOf('?') < 0) {
            url += '?';
        }
        for(var o in pars) {
            url += o + '=' + pars[o] + '&';
        }
    }
    if(url.lastIndexOf('&')==(url.length-1)) {
        url = url.substr(0,(url.length-1));
    }

    return url;

};

exports.parseJSON = function(str) {

    var result = '';
    if(str && str.indexOf('{')==0 && str.lastIndexOf('}')==str.length-1) {
        result = JSON.parse(str);
    }else{
        var result = {
            err_code: '500',
            msg: 'Abnormal returns the result format -- '+str
        }
    }
    return result;
};