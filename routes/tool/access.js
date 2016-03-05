/**
 * 工具
 * 主要控制访问权限
 */

var sessions = {};

var EXPIRES = 1000;

var LOCAL_KEY = '';

/**
 * 获取一个新的Session
 * @returns {{}}
 */
function generate(s) {
  var session = {};
  session.id = getTime() + Math.random();
  session.cookie = {
    expire: getNewTime(s),
    warning: getNewTime(s/2),
  };

  sessions[session.id] = session;
  return session;
}


function getTime() {
  return (new Date()).getTime();
}
function getNewTime(s) {
  return (new Date()).getTime() + (EXPIRES * s);
}


exports.generate = generate;
exports.getNewTime = getNewTime;


exports.register = function(req, res, option) {
  req.session.mysession = generate(option.expires);
  req.session.mysession.access_token = option.access_token;
  req.session.mysession.role = option.role;

  LOCAL_KEY = req.session.mysession.id;

  res.cookie('access_token', req.session.mysession.id, {maxAge: (1000 * option.expires)});
};