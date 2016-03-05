/**
 *
 *
 */
var emitter = require('../tool/emitter');


exports.systemExtensionsList = function(data, callback) {
  emitter.get('/api/system_extensions/list', data, callback);
};