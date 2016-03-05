/**
 *
 *
 */
var emitter = require('../tool/emitter');


exports.providersList = function(data, callback) {
  emitter.get('/api/providers/list', data, callback);
};
exports.providersShow = function(data, callback) {
  emitter.get('/api/providers/show', data, callback);
};

exports.providersCreate = function(data, callback) {
  emitter.post('/api/providers/create', data, callback);
};
exports.providersUpdate = function(data, callback) {
  emitter.post('/api/providers/update', data, callback);
};
exports.providersDestroy = function(data, callback) {
  emitter.post('/api/providers/destroy', data, callback);
};