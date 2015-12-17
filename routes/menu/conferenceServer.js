function csGet (req, res, next) {

    res.render('solomon/settings/conferenceServer/cs');

}
function addServer (req, res, next) {

    res.render('solomon/settings/conferenceServer/addServer');

}



exports.csGet = csGet;
exports.addServer = addServer;