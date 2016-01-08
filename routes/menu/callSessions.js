
var emitter = require('../tool/emitter');

function csGet (req, res, next) {

    emitter.local.get('/api/call_sessions/list', req, function(data){

        console.log('============');
        console.log(data);

        res.render('solomon/callSessions/cs',{csData : JSON.parse(data)});

    });

    //res.render('solomon/callSessions/cs');

}



exports.csGet = csGet;