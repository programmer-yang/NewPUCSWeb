var emitter = require('../tool/emitter');
var apiTenant = require('../api/apiTenant');
var util = require('../tool/util');

var EventProxy = require('eventproxy');



function tenantGet(req, res, next) {

  var ep = new EventProxy();

  ep.all('teData', function(teData) {
    res.render('solomon/tenants/te', {teData: teData});
  });

  ep.fail(function(err, msg) {
    console.log(err);
    res.json({err_code:'500', msg:err.msg || msg });
  });
  apiTenant.tenantList(req.query, util.done('teData', ep, 'tenant/list : Get the data anomalies'));
}
function addTenantGet(req, res, next) {

  res.render('solomon/tenants/addTenant', {type: 'add', data: {}});
}
function addTenantPost(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  ep.all('teData', function(teData) {
    result['teData'] = teData;
    res.json(result).end();
  });
  ep.fail(function(err, msg) {
    result['err_code'] = '500';
    result['msg'] = err.msg || msg;
    res.json(result).end();
  });

  apiTenant.accountCreate(req.body, util.done('teData', ep, 'addTenantPost ERROR', res));

}

function updateTenantGet(req, res, next) {

  var result = {};
  var ep = new EventProxy();
  ep.all('teData', function(teData) {
    result['teData'] = util.parseJSON(teData);

    console.log(result);
    res.render('solomon/tenants/addTenant', {type: 'update', data: result});
  });
  ep.fail(function(err, errMsg) {
   result['err_code'] = err.msg || errMsg;
    res.json(result).end();
  });
  apiTenant.accountShow(req.query, util.done('teData', ep, 'accountShow ERROR'));
}
function updateTenantPost(req, res, next) {
  var ep = new EventProxy();
  var result = {};
  ep.all('teData', function(teData) {
    result['teData'] = teData;
    res.json(result).end();
  });
  ep.fail(function(err, msg) {
    result['err_code'] = '500';
    result['msg'] = err.msg || msg;
    res.json(result).end();
  });

  console.log('********************');
  console.log('********************');
  //for(var o in req.body) {
  //  console.log(o);
  //  if(typeof req.body[o] == 'object') {
  //    for(var oo in req.body[o]) {
  //      console.log(oo);
  //    }
  //  }
  //}
  console.log(req.body);
  //console.log(JSON.parse(req.body));
  //JSON.
  //console.log(JSON.parse(req.body));
  console.log('********************');
  console.log('********************');
  apiTenant.accountUpdate(req.body, util.done('teData', ep, 'addTenantPost ERROR'));
}
function destroyTenantPost(req, res, next) {
  var ep = new EventProxy();
  var result = {};
  ep.all('teData', function(teData) {
    result['teData'] = teData;
    res.json(result).end();
  });
  ep.fail(function(err, msg) {
    result['err_code'] = '500';
    result['msg'] = err.msg ||err.message || msg;
    res.json(result).end();
  });

  apiTenant.accountDestroy(req.body, util.done('teData', ep, 'addTenantPost ERROR'));
}


exports.tenantGet = tenantGet;
exports.addTenantGet = addTenantGet;
exports.addTenantPost = addTenantPost;
exports.updateTenantGet = updateTenantGet;
exports.updateTenantPost = updateTenantPost;
exports.destroyTenantPost = destroyTenantPost;
