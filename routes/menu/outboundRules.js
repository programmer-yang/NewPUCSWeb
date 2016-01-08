
var emitter = require('../tool/emitter');

function orGet (req, res, next) {

    emitter.local.get('/api/outbound_rules/list', req, function(data){

        console.log('============');
        console.log(data);

        res.render('solomon/content/outboundRules/or',{orData : JSON.parse(data)});

    });


    //res.render('solomon/content/outboundRules/or');


}
function addOutboundRuleGet (req, res, next) {

    res.render('solomon/content/outboundRules/addOutboundRule');

}




exports.orGet = orGet;
exports.addOutboundRuleGet = addOutboundRuleGet;