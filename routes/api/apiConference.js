/**
 *
 *
 */
var emitter = require('../tool/emitter');


exports.conferenceRoomList = function(data, callback) {
  emitter.get('/api/conference_room/list', data, callback);
};
exports.conferenceRoomCreate = function(data, callback) {
  emitter.post('/api/conference_room/create', data, callback);
};
exports.conferenceRoomUpdate = function(data, callback) {
  emitter.post('/api/conference_room/update', data, callback);
};
exports.conferenceRoomDestroy = function(data, callback) {
  emitter.post('/api/conference_room/destroy', data, callback);
};
exports.conferenceRoomParticipantsList = function(data, callback) {
  emitter.get('/api/conference_room/participants/list', data, callback);
};
exports.conferenceRoomParticipantsUpdate = function(data, callback) {
  emitter.post('/api/conference_room/participants/update', data, callback);
};



exports.conferenceServerList = function(data, callback) {
  emitter.get('/api/conference_server/list', data, callback);
};
exports.conferenceServerShow = function(data, callback) {
  emitter.get('/api/conference_server/show', data, callback);
};

exports.conferenceServerCreate = function(data, callback) {
  emitter.post('conference_server/create', data, callback);
};
exports.conferenceServerUpdate = function(data, callback) {
  emitter.post('conference_server/update', data, callback);
};
exports.conferenceServerDestroy = function(data, callback) {
  emitter.post('conference_server/destroy', data, callback);
};




