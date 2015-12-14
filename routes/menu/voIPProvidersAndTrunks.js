function vptGet (req, res, next) {

    res.render('solomon/content/vpt/vpt');

}
function addProviderGet (req, res, next) {

    res.render('solomon/content/vpt/addProviders');

}
function addProviderNextGet (req, res, next) {

    res.render('solomon/content/vpt/addProvidersNext');

}



exports.vptGet = vptGet;
exports.addProviderGet = addProviderGet;
exports.addProviderNextGet = addProviderNextGet;