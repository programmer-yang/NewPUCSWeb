var emitter = require('../tool/emitter');
var util = require('../tool/util');
var EventProxy = require('eventproxy');
var proxy = new EventProxy();

var apiRingGroups = require('../api/apiRingGroups');
var apiExtensions = require('../api/apiExtensions');
var apiVirtualReceptionist = require('../api/apiVirtualReceptionist');


function rgGet(req, res, next) {



  var ep = new EventProxy();
  var result = {};
  result['rgsData'] = {};
  ep.all('rgsData', function(rgsData) {
    result.rgsData = util.parseJSON(rgsData);
    console.log(result);
    res.render('solomon/content/ringGroups/rg', {data: result});
  });
  ep.fail(function(err, errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiRingGroups.ringGroupsList(req.query, util.done('rgsData', ep, 'RingGroupsList ERROR'));

}
function addRingGroupGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['esData'] = {};
  result['vrsData'] = {};
  result['rgData'] = {};
  ep.all('esData', 'vrsData', function(orsData, vrsData) {
    result.esData = util.parseJSON(orsData);
    result.vrsData = util.parseJSON(vrsData);
    console.log(result);
    res.render('solomon/content/ringGroups/addRingGroup', {type: 'add',data: result});
  });
  ep.fail(function(err, errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  req.query.cursor = req.query.cursor || 1;
  apiExtensions.extensionList(req.query, util.done('esData', ep, 'ExtensionsList ERROR'));
  apiVirtualReceptionist.virtualReceptionistList(req.query, util.done('vrsData', ep, 'VirtualReceptionistList ERROR'));



}
function addRingGroupPost(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    req.log.info('OutboundRulesCreate Success');
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err,errMsg) {
    req.log.error(errMsg);
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiRingGroups.ringGroupsCreate(req.body, util.done('data', ep, 'ringGroupsCreate ERROR'));

}

function updateRingGroupGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['esData'] = {};
  result['vrsData'] = {};
  result['rgData'] = {};
  ep.all('esData', 'vrsData', 'rgData', function(orsData, vrsData, rgData) {
    result.esData = util.parseJSON(orsData);
    result.vrsData = util.parseJSON(vrsData);
    result.rgData = util.parseJSON(rgData);
    console.log(result);
    res.render('solomon/content/ringGroups/addRingGroup', {type: 'add',data: result});
  });
  ep.fail(function(err, errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  req.query.cursor = req.query.cursor || 1;
  apiExtensions.extensionList(req.query, util.done('esData', ep, 'ExtensionsList ERROR'));
  apiVirtualReceptionist.virtualReceptionistList(req.query, util.done('vrsData', ep, 'VirtualReceptionistList ERROR'));
  apiRingGroups.ringGroupsShow(req.query, util.done('rgData', ep, 'RingGroupsShow ERROR'));

}

function updateRingGroupPost(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    req.log.info('OutboundRulesUpdate Success');
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err,errMsg) {
    req.log.error(errMsg);
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiRingGroups.ringGroupsUpdate(req.body, util.done('data', ep, 'ringGroupsUpdate ERROR'));
}

function deleteRingGroupPost(req, res, next) {
  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    req.log.info('OutboundRulesUpdate Success');
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err,errMsg) {
    req.log.error(errMsg);
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiRingGroups.ringGroupsDestroy(req.body, util.done('data', ep, 'ringGroupsUpdate ERROR'));
}


exports.rgGet = rgGet;
exports.addRingGroupGet = addRingGroupGet;
exports.updateRingGroupGet = updateRingGroupGet;
exports.addRingGroupPost = addRingGroupPost;
exports.updateRingGroupPost = updateRingGroupPost;
exports.deleteRingGroupPost = deleteRingGroupPost;