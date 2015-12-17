function msGet (req, res, next) {

    res.render('solomon/settings/mediaServer/ms');

}
function addServer (req, res, next) {

    res.render('solomon/settings/mediaServer/addServer');

}



exports.msGet = msGet;
exports.addServer = addServer;