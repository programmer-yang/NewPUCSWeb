var zmq = require("zmq");

//var socketReq = zmq.socket("req");
var socketReq = zmq.socket("dealer");

var counter = 0;


socketReq.connect('tcp://192.168.1.66:8798');

var str = {"op": "getValidOperator", "page": "settings", "operator": "admin", "password": "admin"};
console.log(str);
console.log(JSON.stringify(str));
socketReq.send(JSON.stringify(str));

console.log('oooooooooooooooooo');


socketReq.on('message', function (msg) {
    console.log(msg.toString());
});


//socket.connect('tcp://192.168.1.168:8888');
function zmqtest(req, res, next) {
    //..

}


exports.zmqtest = zmqtest;