var languages = {
    login : {
        '0001' : {
            cn : '用户名',
            us : 'Username'
        },
        '0002' : {
            cn : '密码',
            us : 'Password'
        }
    },
    main : {
        '0001' : {
            cn : '模板 v1',
            us : 'Dashboard v11'
        },
        '0002' : {
            cn : '模板 v2',
            us : 'Dashboard v2'
        }
    }
};


function get(type, lg){
    if(!type||!lg){
        return 'error';
    }
    var result = {};
    var ls = languages[type];
    for(var key in ls){
        result[key] = ls[key][lg];
    }

    return result;
}



exports.get = get;

