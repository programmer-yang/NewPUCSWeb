function csGet (req, res, next) {

    res.render('solomon/conferenceServer/cs');

}
function addServer (req, res, next) {

    res.render('solomon/conferenceServer/addServer');

}



exports.csGet = csGet;
exports.addServer = addServer;