function rgGet (req, res, next) {

    res.render('solomon/content/ringGroups/rg');


}
function addRingGroupGet (req, res, next) {

    console.log('abc');

    res.render('solomon/content/ringGroups/addRingGroup');

}




exports.rgGet = rgGet;
exports.addRingGroupGet = addRingGroupGet;