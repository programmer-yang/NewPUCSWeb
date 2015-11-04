function exGet (req, res, next) {

    res.render('solomon/main/extensions/ex');

}

function addExtensionsGet (req, res, next) {

    res.render('solomon/main/extensions/addExtension');

}



exports.exGet = exGet;
exports.addExtensionsGet = addExtensionsGet;