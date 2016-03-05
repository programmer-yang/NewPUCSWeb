/**
 *
 *
 */
var emitter = require('../tool/emitter');


exports.outboundRulesList = function(data, callback) {
  emitter.get('/api/outbound_rules/list', data, callback);
};
exports.outboundRulesShow = function(data, callback) {
  emitter.get('/api/outbound_rules/show', data, callback);
};
exports.outboundRulesCreate = function(data, callback) {
  emitter.post('/api/outbound_rules/create', data, callback);
};
exports.outboundRulesUpdate = function(data, callback) {
  emitter.post('/api/outbound_rules/update', data, callback);
};
exports.outboundRulesDestroy = function(data, callback) {
  emitter.post('/api/outbound_rules/destroy', data, callback);
};

