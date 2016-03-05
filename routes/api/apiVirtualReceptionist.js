/**
 *
 */

/**
 *
 */
var emitter = require('../tool/emitter');


exports.virtualReceptionistList = function(data, callback) {
  emitter.get('/api/virtual_receptionist/list', data, callback);
};
exports.virtualReceptionistShow = function(data, callback) {
  emitter.get('/api/virtual_receptionist/show', data, callback);
};
exports.virtualReceptionistCreate = function(data, callback) {
  emitter.post('/api/virtual_receptionist/create', data, callback);
};
exports.virtualReceptionistUpdate = function(data, callback) {
  emitter.post('/api/virtual_receptionist/update', data, callback);
};
exports.virtualReceptionistDestroy = function(data, callback) {
  emitter.post('/api/virtual_receptionist/destroy', data, callback);
};

