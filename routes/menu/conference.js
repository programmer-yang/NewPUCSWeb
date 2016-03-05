var util = require('../tool/util');
var EventProxy = require('eventproxy');

var apiConference = require('../api/apiConference');


function coGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['crsData'] = {};
  ep.all('crsData', function(crsData) {
    result.crsData = util.parseJSON(crsData);

    req.log.info('conferenceRoomList SUCCESS');
    req.log.info(JSON.stringify(result));

    res.render('solomon/conference/co', {data: result});
  });
  ep.fail(function(err, msg) {
    req.log.error('ProvidersList ERROR');
    req.log.error(msg);
    res.json({err_code:'500', msg:err.msg || msg });
  });
  apiConference.conferenceRoomList(req.query, util.done('crsData', ep, 'conferenceRoomList ERROR'));

}
function addRoomGet(req, res, next) {
  res.render('solomon/conference/addRoom');
}
function addRoomPost(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    req.log.info('conferenceRoomCreate Success');
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err,errMsg) {
    req.log.error(errMsg);
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiConference.conferenceRoomCreate(req.body, util.done('data', ep, 'conferenceRoomCreate ERROR'));
}

function member(req, res, next) {

  console.log('6666');

  res.render('solomon/conference/member');
}


exports.coGet = coGet;
exports.addRoomGet = addRoomGet;
exports.addRoomPost = addRoomPost;
exports.participants = member;