/**
 *
 *
 */
var emitter = require('../tool/emitter');


exports.callQueueList = function(data, callback) {
  emitter.get('/api/call_queues/list', data, callback);
};
exports.callQueueShow = function(data, callback) {
  emitter.get('/api/call_queues/show', data, callback);
};
exports.callQueueCreate = function(data, callback) {
  emitter.post('/api/call_queues/create', data, callback);
};
exports.callQueueUpdate = function(data, callback) {
  emitter.post('/api/call_queues/update', data, callback);
};
exports.callQueueDestroy = function(data, callback) {
  emitter.post('/api/call_queues/destroy', data, callback);
};

