/**
 *
 *
 */
var emitter = require('../tool/emitter');


exports.domainShow = function(data, callback) {
  emitter.get('/api/domain/show', data, callback);
};
exports.domainUpdate = function(data, callback) {
  emitter.post('/api/domain/update', data, callback);
};