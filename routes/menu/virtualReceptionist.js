function vrGet (req, res, next) {

    res.render('solomon/content/virtualReceptionist/vr');

}
function addVirtualReceptionist (req, res, next) {

    res.render('solomon/content/virtualReceptionist/addVirtualReceptionist');

}



exports.vrGet = vrGet;
exports.addVirtualReceptionist = addVirtualReceptionist;