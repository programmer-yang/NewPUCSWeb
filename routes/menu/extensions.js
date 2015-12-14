function exGet (req, res, next) {

    res.render('solomon/content/extensions/ex');

}

function addExtensionsGet (req, res, next) {

    res.render('solomon/content/extensions/addExtension');

}



function getGroupManagement (req, res, next) {

    res.render('solomon/content/extensions/groupManagement/groupManagement');

}
function addGroup (req, res, next) {

    res.render('solomon/content/extensions/groupManagement/addGroup');

}



exports.exGet = exGet;
exports.addExtensionsGet = addExtensionsGet;
exports.getGroupManagement = getGroupManagement;
exports.addGroup = addGroup;