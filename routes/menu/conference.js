
var emitter = require('../tool/emitter');

function coGet (req, res, next) {

    emitter.local.get('/api/conference_server/room/list', req, function(data){

        console.log('============');
        console.log(data);

        res.render('solomon/content/conference/co',{coData : JSON.parse(data)});

    });

    //res.render('solomon/content/conference/co');

}
function addRoomGet (req, res, next) {

    res.render('solomon/content/conference/addRoom');

}



exports.coGet = coGet;
exports.addRoomGet = addRoomGet;