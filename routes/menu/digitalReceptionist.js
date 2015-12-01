function drGet (req, res, next) {

    res.render('solomon/digitalReceptionist/dr');

}
function addDigitalReceptionist (req, res, next) {

    res.render('solomon/digitalReceptionist/addDigitalReceptionist');

}



exports.drGet = drGet;
exports.addDigitalReceptionist = addDigitalReceptionist;