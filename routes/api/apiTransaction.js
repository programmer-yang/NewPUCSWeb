/**
 *
 *
 */
var emitter = require('../tool/emitter');


//exports.transportsList = function(data, callback) {
//  emitter.get('/api/transports/list', data, callback);
//};
exports.transactionCommit = function(data, callback) {
  emitter.post('/api/transaction/commit', data, callback);
};
exports.transactionRollback = function(data, callback) {
  emitter.post('/api/transaction/rollback', data, callback);
};
