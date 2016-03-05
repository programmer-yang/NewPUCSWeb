var emitter = require('../tool/emitter');
var util = require('../tool/util');
var apiExtensions = require('../api/apiExtensions');
var apiRingGroups = require('../api/apiRingGroups');
var apiVirtualReceptionist = require('../api/apiVirtualReceptionist');
var apiVoiceMail = require('../api/apiVoiceMail');
var apiTransaction = require('../api/apiTransaction');
var EventProxy = require('eventproxy');

function exGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['eData'] = {};
  ep.all('eData', function(eData) {
    result.eData = util.parseJSON(eData);
    res.render('solomon/content/extensions/ex', {data: result});
  });
  ep.fail(function(err, msg) {
    res.json({err_code:'500', msg:err.msg || msg });
  });
  apiExtensions.extensionList(req.query, util.done('eData', ep, 'Extensions ERROR'));

}

function addExtensionsGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['eData'] = {};
  result['esData'] = {};
  result['rgData'] = {};
  result['vrsData'] = {};
  ep.all('esData', 'rgData', 'vrsData', function(esData, rgData, vrsData) {
    result.esData = util.parseJSON(esData);
    result.rgData = util.parseJSON(rgData);
    result.vrsData = util.parseJSON(vrsData);

    console.log(JSON.stringify(result));
    res.render('solomon/content/extensions/addExtension', {type: 'add', data: result});
  });
  ep.fail(function(err, msg) {
    res.json({err_code:'500', msg:err.msg || msg });
  });
  //默认参数
  req.query.cursor = 1;
  apiExtensions.extensionList(req.query, util.done('esData', ep, 'Extensions ERROR'));
  apiRingGroups.ringGroupsList(req.query, util.done('rgData', ep, 'RingGroupsList ERROR'));
  apiVirtualReceptionist.virtualReceptionistList(req.query, util.done('vrsData', ep, 'VirtualReceptionist ERROR'));


  //res.render('solomon/content/extensions/addExtension', {type: 'add', data: ''});

}
function addExtensionsPost(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    result = util.parseJSON(data);
    res.json(result).end();

    /**
     * pbx create 成功以后调用voice mail create
     */

    req.body.voice_mail = req.body.voice_mail || {};

    if(req.body.voice_mail) {
      apiVoiceMail.extensionCreate(req.body, function(err, body) {
        if(err) {
          req.log.error('voiceMail create ERROR');
          //apiTransaction.transactionRollback(req.body, function(err, body) {
          //  if(err) {
          //    req.log.error('transactionRollback ERROR');
          //    req.log.error(err);
          //    return;
          //  }
          //  req.log.error('transactionRollback SUCCESS');
          //});
          return;
        }
        req.log.info('voiceMail create SUCCESS');
        req.log.info(body);
        //apiTransaction.transactionCommit(req.body, function(err,body) {
        //  if(err) {
        //    req.log.error('TransactionCommit ERROR');
        //    req.log.error(err);
        //    return;
        //  }
        //  req.log.info('TransactionCommit SUCCESS');
        //});

      });
    }

  });
  ep.fail(function(err,errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiExtensions.extensionCreate(req.body, util.done('data', ep, 'ExtensionGroupCreate ERROR'));

}
function updateExtensionGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['eData'] = {};
  result.eData['voice_mail'] = {};
  ep.all('eData', 'vmData', function(eData, vmData) {
    result.eData = util.parseJSON(eData);
    result.eData.voice_mail = util.parseJSON(vmData);

    console.log(result);
    req.log.info('ExtensionShow Success');
    req.log.info(JSON.stringify(result));
    res.render('solomon/content/extensions/addExtension', {type: 'update', data: result});
  });
  ep.fail(function(err,errMsg) {
    req.log.error(errMsg);
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiExtensions.extensionShow(req.query, util.done('eData', ep, 'PBX ExtensionShow ERROR'));
  apiVoiceMail.extensionShow(req.query, util.done('vmData', ep, 'VoiceMail ExtensionShow ERROR'));


}
function updateExtensionPost(req, res, next) {
  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    result = util.parseJSON(data);
    res.json(result).end();
    /**
     * PBX update 成功以后调用 voiceMail extensionUpdate 接口
     */
    req.log.info('ExtensionUpdate SUCCESS');
    req.body.voice_mail = req.body.voice_mail || {};
    if(req.body.voice_mail) {
      apiVoiceMail.extensionUpdate(req.body, function(err, body) {
        if(err) {
          req.log.error('VoiceMail ExtensionUpdate ERROR');
          //apiTransaction.transactionRollback(req.body, function(err, body) {
          //  if(err) {
          //    req.log.error('TransactionRollback ERROR');
          //    return;
          //  }
          //  req.log.info('TransactionRollback SUCCESS');
          //});
          return;
        }
        req.log.info('VoiceMail ExtensionUpdate SUCCESS');
        //apiTransaction.transactionCommit(req.body, function(err, body) {
        //  if(err) {
        //    req.log.error('TransactionCommit ERROR');
        //    return;
        //  }
        //  req.log.info('TransactionCommit SUCCESS');
        //});

      });
    }


  });
  ep.fail(function(err,errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiExtensions.extensionUpdate(req.body, util.done('data', ep, 'ExtensionUpdate ERROR'));
}
function deleteExtensionPost(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    req.log.info('extensionDestroy SUCCESS');
    result = util.parseJSON(data);
    res.json(result).end();
    apiVoiceMail.extensionDestroy(req.body, function(err, data) {
      if(err) {
        req.log.error('VoiceMail ExtensionDestroy ERROR');
        return;
      }
      req.log.error('VoiceMail ExtensionDestroy SUCCESS');
    })
  });
  ep.fail(function(err,errMsg) {
    req.log.info('extensionDestroy ERROR');
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiExtensions.extensionDestroy(req.body, util.done('data', ep, 'ExtensionUpdate ERROR'));
}


function extensionGroupGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['egData'] = {};
  ep.all('egData', function(egData) {
    result.egData = util.parseJSON(egData);
    res.render('solomon/content/extensions/groupManagement/groupManagement', {data: result});
  });
  ep.fail(function(err, msg) {
    res.json({err_code:'500', msg:err.msg || msg }).end();
  });

  apiExtensions.extensionGroupList(req.query, util.done('egData', ep, 'ExtensionGroupGet ERROR'));

}
function addGroupGet(req, res, next) {


  var ep = new EventProxy();
  var result = {};
  result['eData'] = {};
  result['egData'] = {};
  ep.all('eData', function(eData) {
    result.eData = eData;
    res.render('solomon/content/extensions/groupManagement/addGroup', {type:'add', data: result});
  });
  ep.fail(function(err, errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  //默认参数可能还需修改。临时直接赋值
  req.query.cursor = 1;
  apiExtensions.extensionList(req.query, util.done('eData', ep, 'ExtensionGroupList ERROR'));

}
function addGroupPost(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err, errMSG) {
    res.json({err_code:'500', msg:err.msg || errMSG }).end();
  });
  apiExtensions.extensionGroupCreate(req.body, util.done('data', ep, 'AddExtensionGroupPOST ERROR'));


}
function updateGroupGet(req, res, next) {

  var ep = new EventProxy();
  var result = {};
  result['eData'] = {};
  result['egData'] = {};
  ep.all('eData', 'egData', function(eData, egData) {
    result.eData = util.parseJSON(eData);
    result.egData = util.parseJSON(egData);
    res.render('solomon/content/extensions/groupManagement/addGroup', {type:'update', data: result});
  });
  ep.fail(function(err, errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  //默认参数可能还需修改。临时直接赋值
  req.query.cursor = 1;
  apiExtensions.extensionGroupShow(req.query, util.done('egData', ep, 'ExtensionGroupShow ERROR'));
  apiExtensions.extensionList(req.query, util.done('eData', ep, 'Extension ERROR'));

}
function updateGroupPost(req, res, next) {
  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    result = util.parseJSON(data);
    res.json(result).end();
  });
  ep.fail(function(err,errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiExtensions.extensionGroupUpdate(req.body, util.done('data', ep, 'ExtensionGroupUpdate ERROR'));
}
function deleteGroupPost(req, res, next) {
  var ep = new EventProxy();
  var result = {};
  ep.all('data', function(data) {
    result = util.parseJSON(data);
    res.json(result).end();

  });
  ep.fail(function(err,errMsg) {
    res.json({err_code:'500', msg:err.msg || errMsg }).end();
  });
  apiExtensions.extensionGroupDestroy(req.body, util.done('data', ep, 'ExtensionGroupDestroy ERROR'));
}


exports.exGet = exGet;
exports.addExtensionsGet = addExtensionsGet;
exports.addExtensionsPost = addExtensionsPost;
exports.updateExtensionGet = updateExtensionGet;
exports.updateExtensionPost = updateExtensionPost;
exports.deleteExtensionPost = deleteExtensionPost;

exports.extensionGroupGet = extensionGroupGet;
exports.addGroupGet = addGroupGet;
exports.addGroupPost = addGroupPost;
exports.updateGroupGet = updateGroupGet;
exports.updateGroupPost = updateGroupPost;
exports.deleteGroupPost = deleteGroupPost;