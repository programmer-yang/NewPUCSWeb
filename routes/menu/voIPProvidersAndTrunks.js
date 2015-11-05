function vptGet (req, res, next) {

    res.render('solomon/content/vpt/vpt');

}
function addProviderGet (req, res, next) {

    res.render('solomon/content/vpt/addProviders');

}



exports.vptGet = vptGet;
exports.addProviderGet = addProviderGet;