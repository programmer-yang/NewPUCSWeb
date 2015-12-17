function cqGet (req, res, next) {

    res.render('solomon/content/callQueue/cq');

}
function addCallQueueGet (req, res, next) {

    res.render('solomon/content/callQueue/addCallQueue');

}



exports.cqGet = cqGet;
exports.addCallQueueGet = addCallQueueGet;