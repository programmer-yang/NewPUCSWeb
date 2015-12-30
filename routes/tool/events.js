
var events = require('events');

var eventEmitter = new events.EventEmitter();


exports.saveCallBack = function (cid, callBack) {

    if (eventEmitter.once(cid,callBack)) {
        return true;
    }
    return false;

};
exports.triggerCallBack = function (cid,data) {
    //console.log(cid);
    if(cid) {
        eventEmitter.emit(cid,data);
    }
};