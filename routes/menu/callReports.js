function crGet (req, res, next) {

    res.render('solomon/callReports/cr');

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