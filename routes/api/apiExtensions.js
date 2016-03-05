/**
 *
 *
 */
var emitter = require('../tool/emitter');


exports.extensionList = function(data, callback) {
  emitter.get('/api/extensions/list', data, callback);
};
exports.extensionCreate = function(data, callback) {
  emitter.post('/api/extensions/create', data, callback);
};
exports.extensionShow = function(data, callback) {
  emitter.get('/api/extensions/show', data, callback);
};
exports.extensionUpdate = function(data, callback) {
  emitter.post('/api/extensions/update', data, callback);
};
exports.extensionDestroy = function(data, callback) {
  emitter.post('/api/extensions/destroy', data, callback);
};


exports.extensionGroupList = function(data, callback) {
  emitter.get('/api/extensions/group/list', data, callback);
};
exports.extensionGroupCreate = function(data, callback) {
  emitter.post('/api/extensions/group/create', data, callback);
};
exports.extensionGroupShow = function(data, callback) {
  emitter.get('/api/extensions/group/show', data, callback);
};
exports.extensionGroupUpdate = function(data, callback) {
  emitter.post('/api/extensions/group/update', data, callback);
};
exports.extensionGroupDestroy = function(data, callback) {
  emitter.post('/api/extensions/group/destroy', data, callback);
};



