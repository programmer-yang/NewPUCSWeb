/**
 *
 * 定义对外提供的API
 * 回调的处理统一使用事件订阅发布模式
 * （这里为什么不封装到emitter里，是因为考虑到对于返回数据的处理的灵活性，考虑到如果封装到emitter里去的话，如果要针对某一个接口
 * 的返回结果作特殊的处理就不是特别方便）
 **/



var express = require('express');
var api = express.Router();

var emitter = require('../tool/emitter');

var events = require('../tool/events');
var ef = require('../tool/errors');
var util = require('../tool/util');
var EventProxy = require('eventproxy');
var proxy = new EventProxy();


proxy.on('get', function (err, response, res) {
  if (err) {
    ef.getError('500', '500', res);
    return;
  }
  var code = response.statusCode;
  var result = util.parseJSON(response.body);
  res.status(code).json(result).end();

});
proxy.on('post', function (err, response, res) {
  if (err) {
    ef.getError('500', '500', res);
    return;
  }
  var code = response.statusCode;
  if (typeof response.body == 'string')
    var result = util.parseJSON(response.body);
  else
    result = response.body;
  res.status(code).json(result).end();

});


function trimUrl(req) {
  /**
   * 客户端访问服务端API处理方法
   * 现在默认API一样
   */
  var result = '';
  if (req.url) {
    result = req.url;
  }
  return result;
}

api.post('/api/account/credentials/verify', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});

/**
 * Call Manager  BEGIN
 */
/**
 * Extensions
 */
api.get('/api/extensions/list', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});
api.get('/api/extensions/show', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});
api.post('/api/extensions/create', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});
api.post('/api/extensions/update', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});
api.post('/api/extensions/destroy', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});
/**
 * Group Management
 */
api.get('/api/extensions/group/list', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});
api.post('/api/extensions/group/create', function (req, res, next) {

  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});
api.get('/api/extensions/group/show', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});
api.post('/api/extensions/group/update', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});
api.post('/api/extensions/group/destroy', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});
/**
 * System Extensions
 */
api.get('/api/system_extensions/list', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});

/**
 * Domain and transport
 */
api.get('/api/domain/show', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});
api.post('/api/domain/create', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});
api.get('/api/transports/list', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});
api.post('/api/transports/create', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});


/**
 * VoIP Providers Trunks
 */
api.get('/api/providers/list', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});
api.post('/api/providers/create', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});
api.get('/api/providers/show', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});
api.post('/api/providers/update', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});

/**
 * Inbound Rules
 */
api.get('/api/inbound_rules/list', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});
api.post('/api/inbound_rules/create', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});
api.get('/api/inbound_rules/show', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});
api.post('/api/inbound_rules/update', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});


/**
 * Outbound Rules
 */
api.get('/api/outbound_rules/list', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});
api.get('/api/outbound_rules/show', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});
api.post('/api/outbound_rules/create', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});
api.post('/api/outbound_rules/update', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});
api.post('/api/outbound_rules/update', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});

/**
 * Ring Groups
 */
api.get('/api/ring_groups/list', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});
api.get('/api/ring_groups/show', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});
api.post('/api/ring_groups/create', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});
api.post('/api/ring_groups/update', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});
/**
 * Virtual Receptionist
 */
api.get('/api/virtual_receptionist/list', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});
api.get('/api/virtual_receptionist/show', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});
api.post('/api/virtual_receptionist/update', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});
api.post('/api/virtual_receptionist/create', function (req, res, next) {
  emitter.post(req, function (err, response, body) {
    proxy.emit('post', err, response, res);
  });
});

/**
 * Call Queue
 */
api.get('/api/call_queues/list', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});
/**
 * Conference
 */
api.get('/api/conference_server/room/list', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});


/**
 * Tenant
 */
api.get('/api/tenant/list', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});

/**
 * Recordings
 */
api.get('/api/recordings/list', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});

/**
 * Call Sessions
 */
api.get('/api/call_sessions/list', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});

/**
 * Call Reports
 */
api.get('/api/call_reports/list', function (req, res, next) {
  emitter.get(req, function (err, response, body) {
    proxy.emit('get', err, response, res);
  });
});


module.exports = api;






