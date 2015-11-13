function orGet (req, res, next) {

    res.render('solomon/content/outboundRules/or');


}
function addOutboundRuleGet (req, res, next) {

    res.render('solomon/content/outboundRules/addOutboundRule');

}




exports.orGet = orGet;
exports.addOutboundRuleGet = addOutboundRuleGet;