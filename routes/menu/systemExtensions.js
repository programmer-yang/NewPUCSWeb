var emitter = require('../tool/emitter');
var util = require('../tool/util');
var EventProxy = require('eventproxy');

var apiSystemExtensions = require('../api/apiSystemExtensions');

function sexGet(req, res, next) {


  var ep = new EventProxy();
  var result = {};
  result['seData'] = {};
  ep.all('seData', function(seData) {
    result.seData = util.parseJSON(seData);
    res.render('solomon/content/systemExtensions/sex', {data: result});
  });
  ep.fail(function(err, errMsg) {
    res.json({err_code:'500', msg:err.msg || msg });
  });
  apiSystemExtensions.systemExtensionsList(req.query, util.done('seData', ep, 'SystemExtensionsList ERROR'));

}


exports.sexGet = sexGet;