
var emitter = require('../tool/emitter');

function recordingsGet (req, res, next) {

    emitter.local.get('/api/recordings/list', req, function(data){

        console.log('============');
        console.log(data);

        res.render('solomon/recordingsManagement/rm',{rmData : JSON.parse(data)});

    });
    //res.render('solomon/recordingsManagement/rm');

}
function addRecordingsGet (req, res, next) {

    res.render('solomon/recordingsManagement/addRecordings');

}



exports.recordingsGet = recordingsGet;
exports.addRecordingsGet = addRecordingsGet;