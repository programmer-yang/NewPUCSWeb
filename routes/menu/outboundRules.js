var emitter = require('../tool/emitter');
var util = require('../tool/util');
var EventProxy = require('eventproxy');
var proxy = new EventProxy();

var apiOutboundRules = require('../api/apiOutboundRules');
var apiProviders = require('../api/apiProviders');
var apiExtensions = require('../api/apiExtensions');

function orGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['orsData'] = {};
  ep.all('orsData', function(orsData) {
    result.orsData = util.parseJSON(orsData);
    console.log(result);
    res.render('solomon/content/outboundRules/or', {data: result});
  });
  ep.fail(function(err, errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiOutboundRules.outboundRulesList(req.query, util.done('orsData', ep, 'OutboundRulesList ERROR'));

}
function addOutboundRuleGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['psData'] = {};
  result['egsData'] = {};
  result['orData'] = {};
  ep.all('psData', 'egsData', function(psData, egsData) {
    result.psData = util.parseJSON(psData);
    result.egsData = util.parseJSON(egsData);
    console.log(result);
    res.render('solomon/content/outboundRules/addOutboundRule', {type: 'add', data: result});
  });
  ep.fail(function(err, errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiProviders.providersList(req.query, util.done('psData', ep, 'ProvidersList ERROR'));
  apiExtensions.extensionGroupList(req.query, util.done('egsData', ep, 'extensionGroup ERROR'));

}
function updateOutboundRuleGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['psData'] = {};
  result['egsData'] = {};
  result['orData'] = {};
  ep.all('psData', 'egsData', 'orData', function(psData, egsData, orData) {
    result.psData = util.parseJSON(psData);
    result.egsData = util.parseJSON(egsData);
    result.orData = util.parseJSON(orData);
    console.log(result);
    res.render('solomon/content/outboundRules/addOutboundRule', {type: 'update', data: result});
  });
  ep.fail(function(err, errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiProviders.providersList(req.query, util.done('psData', ep, 'ProvidersList ERROR'));
  apiExtensions.extensionGroupList(req.query, util.done('egsData', ep, 'extensionGroup ERROR'));
  apiOutboundRules.outboundRulesShow(req.query, util.done('orData', ep, 'OutBoundRules ERROR'));

}
function addOutboundRulePost(req, res, next) {

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
  apiOutboundRules.outboundRulesCreate(req.body, util.done('data', ep, 'OutboundRulesCreate ERROR'));

}
function updateOutboundRulePost(req, res, next) {
  //console.log(req.body);
  //var url = '/api/outbound_rules/update';
  //emitter.local.post(url, req.body, function (data) {
  //  res.json(data).end();
  //});

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
  apiOutboundRules.outboundRulesUpdate(req.body, util.done('data', ep, 'OutboundRulesUpdate ERROR'));

}


function deleteOutboundRulePost(req, res, next) {
  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    req.log.info('OutboundRulesDelete Success');
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err,errMsg) {
    req.log.error(errMsg);
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiOutboundRules.outboundRulesDestroy(req.body, util.done('data', ep, 'OutboundRulesDelete ERROR'));

}


exports.orGet = orGet;
exports.addOutboundRuleGet = addOutboundRuleGet;
exports.updateOutboundRuleGet = updateOutboundRuleGet;
exports.addOutboundRulePost = addOutboundRulePost;
exports.updateOutboundRulePost = updateOutboundRulePost;
exports.deleteOutboundRulePost = deleteOutboundRulePost;