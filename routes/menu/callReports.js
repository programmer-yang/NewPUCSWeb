
var emitter = require('../tool/emitter');

function crGet (req, res, next) {

    emitter.local.get('/api/call_reports/list', req, function(data){

        console.log('============');
        console.log(data);

        res.render('solomon/callReports/cr',{crData : JSON.parse(data)});

    });


    //res.render('solomon/callReports/cr');

}
function searchGet (req, res, next) {

    res.render('solomon/callReports/searchDetail');

}
function downloadGet (req, res, next) {

    res.render('solomon/callReports/downloadOption');

}



exports.crGet = crGet;
exports.searchGet = searchGet;
exports.downloadGet = downloadGet;