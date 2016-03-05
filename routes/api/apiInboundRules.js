/**
 *
 *
 */
var emitter = require('../tool/emitter');


exports.inboundRulesList = function(data, callback) {
  emitter.get('/api/inbound_rules/list', data, callback);
};
exports.inboundRulesShow = function(data, callback) {
  emitter.get('/api/inbound_rules/show', data, callback);
};
exports.inboundRulesCreate = function(data, callback) {
  emitter.post('/api/inbound_rules/create', data, callback);
};
exports.inboundRulesUpdate = function(data, callback) {
  emitter.post('/api/inbound_rules/update', data, callback);
};
exports.inboundRulesDestroy = function(data, callback) {
  emitter.post('/api/inbound_rules/destroy', data, callback);
};

