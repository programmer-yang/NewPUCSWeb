var emitter = require('../tool/emitter');
var source = require('../tool/source');
var util = require('../tool/util');
var EventProxy = require('eventproxy');
var apiProviders = require('../api/apiProviders');

function vptGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['pData'] = {};
  ep.all('pData', function(pData) {
    result.pData = util.parseJSON(pData);

    req.log.info('ProvidersList SUCCESS');
    req.log.info(JSON.stringify(result));

    res.render('solomon/content/vpt/vpt', {data: result});
  });
  ep.fail(function(err, msg) {
    req.log.error('ProvidersList ERROR');
    req.log.error(msg);
    res.json({err_code:'500', msg:err.msg || msg });
  });
  apiProviders.providersList(req.query, util.done('pData', ep, 'vptGet ERROR'));

}
function addProviderGet(req, res, next) {

  var result = {};
  result.pData = {};
  result.provider = source.Provider;

  console.log(result);
  res.render('solomon/content/vpt/addProviders', {type: 'add', data: result});

}

function addProviderPost(req, res, nex) {


  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err,errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiProviders.providersCreate(req.body, util.done('data', ep, 'ProvidersCreate ERROR'));

}

function updateProviderGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['pData'] = {};
  result.provider = source.Provider;
  ep.all('pData', function(pData) {
    result.pData = util.parseJSON(pData);

    req.log.info('ProvidersShw SUCCESS');
    console.log(result);

    res.render('solomon/content/vpt/addProviders', {type: 'update', data: result});
  });
  ep.fail(function(err, msg) {
    req.log.error(msg);
    res.json({err_code:'500', msg:err.msg || msg });
  });
  apiProviders.providersShow(req.query, util.done('pData', ep, 'providerShow ERROR'));

}

function updateProviderPost(req, res, nex) {
  //console.log(req.body);
  //var url = '/api/providers/update';
  //emitter.local.post(url, req.body, function (data) {
  //  res.json(data).end();
  //});

  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err,errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiProviders.providersUpdate(req.body, util.done('data', ep, 'ProvidersUpdate ERROR'));


}

function deleteProviderPost(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err,errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiProviders.providersDestroy(req.body, util.done('data', ep, 'ProvidersDestroy ERROR'));

}


exports.vptGet = vptGet;
exports.addProviderGet = addProviderGet;
exports.updateProviderGet = updateProviderGet;
exports.addProviderPost = addProviderPost;
exports.updateProviderPost = updateProviderPost;
exports.deleteProviderPost = deleteProviderPost;