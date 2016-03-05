/**
 *
 *
 */
var emitter = require('../tool/emitter');


exports.transportsList = function(data, callback) {
  emitter.get('/api/transports/list', data, callback);
};
exports.transportsCreate = function(data, callback) {
  emitter.post('/api/transports/create', data, callback);
};
exports.transportsDestroy = function(data, callback) {
  emitter.post('/api/transports/destroy', data, callback);
};
