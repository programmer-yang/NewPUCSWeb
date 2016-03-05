/**
 *
 */
var emitter = require('../tool/emitter');

exports.extensionCreate = function(data, callback) {
  emitter.voiceMail.post('/api/extensions/create', data, callback);
};
exports.extensionShow = function(data, callback) {
  emitter.voiceMail.get('/api/extensions/show', data, callback);
};
exports.extensionUpdate = function(data, callback) {
  emitter.voiceMail.post('/api/extensions/update', data, callback);
};
exports.extensionDestroy = function(data, callback) {
  emitter.voiceMail.post('/api/extensions/destroy', data, callback);
};