var util = require('../tool/util');
var EventProxy = require('eventproxy');

var apiCallQueue = require('../api/apiCallQueue');
var apiExtensions = require('../api/apiExtensions');
var apiRingGroups = require('../api/apiRingGroups');
var apiVirtualReceptionist = require('../api/apiVirtualReceptionist');

function cqGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['cqsData'] = {};
  ep.all('cqsData', function(cqsData) {
    result.cqsData = util.parseJSON(cqsData);

    req.log.info('ProvidersList SUCCESS');
    req.log.info(JSON.stringify(result));

    res.render('solomon/content/callQueue/cq', {data: result});
  });
  ep.fail(function(err, msg) {
    req.log.error('ProvidersList ERROR');
    req.log.error(msg);
    res.json({err_code:'500', msg:err.msg || msg });
  });
  apiCallQueue.callQueueList(req.query, util.done('cqsData', ep, 'CallQueueList ERROR'));

}
function addCallQueueGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['esData'] = {};
  result['rgsData'] = {};
  result['vrsData'] = {};
  result['cqData'] = {};
  ep.all('esData', 'rgsData', 'vrsData', function(esData, rgsData, vrsData) {
    result.esData = util.parseJSON(esData);
    result.rgsData = util.parseJSON(rgsData);
    result.vrsData = util.parseJSON(vrsData);

    req.log.info('ProvidersList SUCCESS');
    req.log.info(JSON.stringify(result));

    res.render('solomon/content/callQueue/addCallQueue', {type: 'add',data: result});
  });
  ep.fail(function(err, msg) {
    req.log.error('ProvidersList ERROR');
    req.log.error(msg);
    res.json({err_code:'500', msg:err.msg || msg });
  });
  apiExtensions.extensionList(req.query, util.done('esData', ep, 'ExtensionList ERROR'));
  apiRingGroups.ringGroupsList(req.query, util.done('rgsData', ep, 'RingGroupsList ERROR'));
  apiVirtualReceptionist.virtualReceptionistList(req.query, util.done('vrsData', ep, 'VirtualReceptionistList ERROR'));


}

function addCallQueuePost(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    req.log.info('CallQueueCreate Success');
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err,errMsg) {
    req.log.error(errMsg);
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiCallQueue.callQueueCreate(req.body, util.done('data', ep, 'CallQueueCreate ERROR'));

}

function updateCallQueueGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['esData'] = {};
  result['rgsData'] = {};
  result['vrsData'] = {};
  result['cqData'] = {};
  ep.all('esData', 'rgsData', 'vrsData', 'cqData', function(esData, rgsData, vrsData, cqData) {
    result.esData = util.parseJSON(esData);
    result.rgsData = util.parseJSON(rgsData);
    result.vrsData = util.parseJSON(vrsData);
    result.cqData = util.parseJSON(cqData);

    req.log.info('ProvidersList SUCCESS');
    //req.log.info(JSON.stringify(result));

    res.render('solomon/content/callQueue/addCallQueue', {type: 'add',data: result});
  });
  ep.fail(function(err, msg) {
    req.log.error('ProvidersList ERROR');
    req.log.error(msg);
    res.json({err_code:'500', msg:err.msg || msg });
  });
  apiExtensions.extensionList(req.query, util.done('esData', ep, 'ExtensionList ERROR'));
  apiRingGroups.ringGroupsList(req.query, util.done('rgsData', ep, 'RingGroupsList ERROR'));
  apiVirtualReceptionist.virtualReceptionistList(req.query, util.done('vrsData', ep, 'VirtualReceptionistList ERROR'));
  apiCallQueue.callQueueShow(req.query, util.done('cqData', ep, 'CallQueueShow ERROR'));





}
function updateCallQueuePost(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    req.log.info('CallQueueUpdate Success');
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err,errMsg) {
    req.log.error(errMsg);
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiCallQueue.callQueueUpdate(req.body, util.done('data', ep, 'CallQueueUpdate ERROR'));

}

function deleteCallQueuePost(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    req.log.info('CallQueueDestroy Success');
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err,errMsg) {
    req.log.error(errMsg);
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiCallQueue.callQueueDestroy(req.body, util.done('data', ep, 'CallQueueDestroy ERROR'));

}




exports.cqGet = cqGet;
exports.addCallQueueGet = addCallQueueGet;
exports.addCallQueuePost = addCallQueuePost;
exports.updateCallQueueGet = updateCallQueueGet;
exports.updateCallQueuePost = updateCallQueuePost;
exports.deleteCallQueuePost = deleteCallQueuePost;