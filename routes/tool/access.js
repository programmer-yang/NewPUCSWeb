/**
 * 工具
 * 主要控制访问权限
 */





var sessions = {};

var EXPIRES = 60 * 1000 * 10;

/**
 * 获取一个新的Session
 * @returns {{}}
 */
function generate() {
    var session = {};
    session.id = getTime() + Math.random();
    session.cookie = {
        expire: getNewTime()
    };

    sessions[session.id] = session;
    return session;
}


function getTime() {
    return (new Date()).getTime();
}
function getNewTime() {
    return (new Date()).getTime() + EXPIRES;
}


exports.generate = generate;
exports.getNewTime = getNewTime;