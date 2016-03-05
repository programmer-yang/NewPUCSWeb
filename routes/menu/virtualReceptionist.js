var emitter = require('../tool/emitter');
var util = require('../tool/util');
var EventProxy = require('eventproxy');
var proxy = new EventProxy();

var apiVirtualReceptionist = require('../api/apiVirtualReceptionist');
var apiExtensions = require('../api/apiExtensions');
var apiRingGroups = require('../api/apiRingGroups');
var apiCallQueue = require('../api/apiCallQueue');

function vrGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['vrsData'] = {};
  ep.all('vrsData', function(vrsData) {
    result.vrsData = util.parseJSON(vrsData);
    console.log(result);
    res.render('solomon/content/virtualReceptionist/vr', {data: result});
  });
  ep.fail(function(err, errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiVirtualReceptionist.virtualReceptionistList(req.query, util.done('vrsData', ep, 'VirtualReceptionistList ERROR'));


}
function addVirtualReceptionistGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['esData'] = {};
  result['rgsData'] = {};
  result['cqsData'] = {};
  result['vrsData'] = {};
  result['vrData'] = {};
  ep.all('esData', 'rgsData', 'cqsData', 'vrsData', function(esData, rgsData, cqsData, vrsData) {
    result.esData = util.parseJSON(esData);
    result.rgsData = util.parseJSON(rgsData);
    result.cqsData = util.parseJSON(cqsData);
    result.vrsData = util.parseJSON(vrsData);
    console.log(result);
    res.render('solomon/content/virtualReceptionist/addVirtualReceptionist', {type: 'add', data: result});
  });
  ep.fail(function(err, errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiExtensions.extensionList(req.query, util.done('esData', ep, 'ExtensionList ERROR'));
  apiRingGroups.ringGroupsList(req.query, util.done('rgsData', ep, 'RingGroupsList ERROR'));
  apiCallQueue.callQueueList(req.query, util.done('cqsData', ep, 'CallQueueList ERROR'));
  apiVirtualReceptionist.virtualReceptionistList(req.query, util.done('vrsData', ep, 'VirtualReceptionistList ERROR'));



}
function addVirtualReceptionistPost(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    req.log.info('VirtualReceptionistCreate Success');
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err,errMsg) {
    req.log.error(errMsg);
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiVirtualReceptionist.virtualReceptionistCreate(req.body, util.done('data', ep, 'VirtualReceptionistCreate ERROR'));

}
function updateVirtualReceptionistGet(req, res, next) {

  //proxy.all('eData', 'rgData', 'cqData', 'vrsData', function(eData, rgData, cqData, vrsData, vrData) {
  //  var result = {};
  //  result['eData'] = util.parseJSON(eData);
  //  result['rgData'] = util.parseJSON(rgData);
  //  result['cqData'] = util.parseJSON(cqData);
  //  result['vrsData'] = util.parseJSON(vrsData);
  //  result['vrData'] = util.parseJSON(vrData);
  //  //result['vrData'] = {};
  //  console.log(result);
  //
  //  res.render('solomon/content/virtualReceptionist/addVirtualReceptionist', {type: 'update', data: result});
  //});
  //emitter.local.get('/api/extensions/list', req, function (err, data) {
  //  proxy.emit('eData', data);
  //});
  //emitter.local.get('/api/ring_groups/list', req, function (err, data) {
  //  proxy.emit('rgData', data);
  //});
  //emitter.local.get('/api/call_queues/list', req, function (err, data) {
  //  proxy.emit('cqData', data);
  //});
  //emitter.local.get('/api/virtual_receptionist/list', req, function (err, data) {
  //  proxy.emit('vrsData', data);
  //});
  //emitter.local.get('/api/virtual_receptionist/show', req, function (err, data) {
  //  proxy.emit('vrData', data);
  //});


  var ep = new EventProxy();
  var result = {};
  result['esData'] = {};
  result['rgsData'] = {};
  result['cqsData'] = {};
  result['vrsData'] = {};
  result['vrData'] = {};
  ep.all('esData', 'rgsData', 'cqsData', 'vrsData', 'vrData', function(esData, rgsData, cqsData, vrsData, vrData) {
    result.esData = util.parseJSON(esData);
    result.rgsData = util.parseJSON(rgsData);
    result.cqsData = util.parseJSON(cqsData);
    result.vrsData = util.parseJSON(vrsData);
    result.vrData = util.parseJSON(vrData);
    console.log(result);
    res.render('solomon/content/virtualReceptionist/addVirtualReceptionist', {type: 'update', data: result});
  });
  ep.fail(function(err, errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiExtensions.extensionList(req.query, util.done('esData', ep, 'ExtensionList ERROR'));
  apiRingGroups.ringGroupsList(req.query, util.done('rgsData', ep, 'RingGroupsList ERROR'));
  apiCallQueue.callQueueList(req.query, util.done('cqsData', ep, 'CallQueueList ERROR'));
  apiVirtualReceptionist.virtualReceptionistList(req.query, util.done('vrsData', ep, 'VirtualReceptionistList ERROR'));
  apiVirtualReceptionist.virtualReceptionistShow(req.query, util.done('vrData', ep, 'VirtualReceptionistShow ERROR'));


}
function updateVirtualReceptionistPost(req, res, next) {
  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    req.log.info('VirtualReceptionistUpdate Success');
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err,errMsg) {
    req.log.error(errMsg);
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiVirtualReceptionist.virtualReceptionistUpdate(req.body, util.done('data', ep, 'VirtualReceptionistUpdate ERROR'));
}

function deleteVirtualReceptionistPost(req, res, next) {
  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    req.log.info('VirtualReceptionistDestroy Success');
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err,errMsg) {
    req.log.error(errMsg);
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiVirtualReceptionist.virtualReceptionistDestroy(req.body, util.done('data', ep, 'VirtualReceptionistDestroy ERROR'));
}


exports.vrGet = vrGet;
exports.addVirtualReceptionistGet = addVirtualReceptionistGet;
exports.addVirtualReceptionistPost = addVirtualReceptionistPost;
exports.updateVirtualReceptionistGet = updateVirtualReceptionistGet;
exports.updateVirtualReceptionistPost = updateVirtualReceptionistPost;
exports.deleteVirtualReceptionistPost = deleteVirtualReceptionistPost;