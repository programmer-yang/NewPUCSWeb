function nbGet (req, res, next) {

    res.render('solomon/settings/numberBlacklist/nb');

}
function addBlacklist (req, res, next) {

    res.render('solomon/settings/numberBlacklist/addNumberBlacklist');

}



exports.nbGet = nbGet;
exports.addBlacklist = addBlacklist;