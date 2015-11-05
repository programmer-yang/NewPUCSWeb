function exGet (req, res, next) {

    res.render('solomon/content/extensions/ex');

}

function addExtensionsGet (req, res, next) {

    res.render('solomon/content/extensions/addExtension');

}



exports.exGet = exGet;
exports.addExtensionsGet = addExtensionsGet;