//var zmq = require("zmq");
//
//var pbxServer = zmq.socket("dealer");
//
//
//pbxServer.connect('tcp://192.168.1.66:8798');
//
//
//function send(mark, describe, callback) {
//
//
//    switch(mark) {
//        case 'pbx' :
//            pbxServer.send(JSON.stringify(describe));
//            pbxServer.once('message', function(data) {
//                if(typeof data == 'object'){
//                    data = JSON.parse(data.toString());
//                }else{
//                    data = {'type':'error','result':'PBXZMQ error'}
//                }
//
//                callback(data);
//            });
//            break;
//    }
//
//
//
//}
//
//
//exports.send = send;
