function irGet (req, res, next) {

    res.render('solomon/content/inboundRules/ir');


}
function addInboundRuleGet (req, res, next) {

    res.render('solomon/content/inboundRules/addInboundRule');

}




exports.irGet = irGet;
exports.addInboundRuleGet = addInboundRuleGet;