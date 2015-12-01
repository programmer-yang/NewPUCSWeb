function msGet (req, res, next) {

    res.render('solomon/mediaServer/ms');

}
function addServer (req, res, next) {

    res.render('solomon/mediaServer/addServer');

}



exports.msGet = msGet;
exports.addServer = addServer;