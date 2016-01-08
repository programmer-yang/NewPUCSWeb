
var emitter = require('../tool/emitter');

function irGet (req, res, next) {


    emitter.local.get('/api/inbound_rules/list', req, function(data){

        console.log('============');
        console.log(data);

        res.render('solomon/content/inboundRules/ir',{irData : JSON.parse(data)});

    });


    //res.render('solomon/content/inboundRules/ir');


}
function addInboundRuleGet (req, res, next) {

    res.render('solomon/content/inboundRules/addInboundRule');

}




exports.irGet = irGet;
exports.addInboundRuleGet = addInboundRuleGet;