var emitter = require('../tool/emitter');
var util = require('../tool/util');
var EventProxy = require('eventproxy');
var proxy = new EventProxy();

var apiInboundRules = require('../api/apiInboundRules');
var apiProviders = require('../api/apiProviders');
var apiExtensions = require('../api/apiExtensions');
var apiVirtualReceptionist = require('../api/apiVirtualReceptionist');


function irGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['irsData'] = {};
  ep.all('irsData', function(irsData) {
    result.irsData = util.parseJSON(irsData);
    console.log(result);
    res.render('solomon/content/inboundRules/ir', {data: result});
  });
  ep.fail(function(err, errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiInboundRules.inboundRulesList(req.query, util.done('irsData', ep, 'InboundRulesList ERROR'));

}
function addInboundRuleGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['psData'] = {};
  result['esData'] = {};
  result['vrsData'] = {};
  ep.all('psData', 'esData', 'vrsData', function(psData, esData, vrsData) {
    result.psData = util.parseJSON(psData);
    result.esData = util.parseJSON(esData);
    result.vrsData = util.parseJSON(vrsData);
    console.log(result);
    res.render('solomon/content/inboundRules/addInboundRule', {type: 'add', data: result});
  });
  ep.fail(function(err, errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  req.query.cursor = 1;
  apiProviders.providersList(req.query, util.done('psData', ep, 'ProvidersList ERROR'));
  apiExtensions.extensionList(req.query, util.done('esData', ep, 'extensions ERROR'));
  apiVirtualReceptionist.virtualReceptionistList(req.query, util.done('vrsData', ep, 'virtualReceptionistList ERROR'));

}

function addInboundRulePost(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    req.log.info('InboundRuleCreate Success');
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err,errMsg) {
    req.log.error(errMsg);
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiInboundRules.inboundRulesCreate(req.body, util.done('data', ep, 'InboundRulesCreate ERROR'));

}

function updateInboundRuleGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['psData'] = {};
  result['esData'] = {};
  result['vrsData'] = {};
  result['irData'] = {};
  ep.all('psData', 'esData', 'vrsData', 'irData', function(psData, esData, vrsData, irData) {
    result.psData = util.parseJSON(psData);
    result.esData = util.parseJSON(esData);
    result.vrsData = util.parseJSON(vrsData);
    result.irData = util.parseJSON(irData);
    console.log(result);
    res.render('solomon/content/inboundRules/addInboundRule', {type: 'add', data: result});
  });
  ep.fail(function(err, errMsg) {
    req.log.error(errMsg);
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  req.query.cursor = 1;
  apiProviders.providersList(req.query, util.done('psData', ep, 'ProvidersList ERROR'));
  apiExtensions.extensionList(req.query, util.done('esData', ep, 'extensions ERROR'));
  apiVirtualReceptionist.virtualReceptionistList(req.query, util.done('vrsData', ep, 'virtualReceptionistList ERROR'));
  apiInboundRules.inboundRulesShow(req.query,util.done('irData', ep, 'InboundRulesShow ERROR'));

}

function updateInboundRulePost(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    req.log.info('InboundRulesUpdate Success');
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err,errMsg) {
    req.log.error(errMsg);
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiInboundRules.inboundRulesUpdate(req.body, util.done('data', ep, 'InboundRulesUpdate ERROR'));
}

function deleteInboundRulesPost(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    req.log.info('InboundRulesDelete Success');
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err,errMsg) {
    req.log.error(errMsg);
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiInboundRules.inboundRulesDestroy(req.body, util.done('data', ep, 'InboundRulesDelete ERROR'));

}




exports.irGet = irGet;
exports.addInboundRuleGet = addInboundRuleGet;
exports.addInboundRulePost = addInboundRulePost;
exports.updateInboundRuleGet = updateInboundRuleGet;
exports.updateInboundRulePost = updateInboundRulePost;
exports.deleteInboundRulesPost = deleteInboundRulesPost;