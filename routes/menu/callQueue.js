
var emitter = require('../tool/emitter');

function cqGet (req, res, next) {

    emitter.local.get('/api/call_queues/list', req, function(data){

        console.log('============');
        console.log(data);

        res.render('solomon/content/callQueue/cq',{cqData : JSON.parse(data)});

    });

    //res.render('solomon/content/callQueue/cq');

}
function addCallQueueGet (req, res, next) {

    res.render('solomon/content/callQueue/addCallQueue');

}



exports.cqGet = cqGet;
exports.addCallQueueGet = addCallQueueGet;