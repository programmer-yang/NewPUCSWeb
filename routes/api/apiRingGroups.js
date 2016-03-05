/**
 *
 */
var emitter = require('../tool/emitter');


exports.ringGroupsList = function(data, callback) {
  emitter.get('/api/ring_groups/list', data, callback);
};
exports.ringGroupsShow = function(data, callback) {
  emitter.get('/api/ring_groups/show', data, callback);
};
exports.ringGroupsCreate = function(data, callback) {
  emitter.post('/api/ring_groups/create', data, callback);
};
exports.ringGroupsUpdate = function(data, callback) {
  emitter.post('/api/ring_groups/update', data, callback);
};
exports.ringGroupsDestroy = function(data, callback) {
  emitter.post('/api/ring_groups/destroy', data, callback);
};

