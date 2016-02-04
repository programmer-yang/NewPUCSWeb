
var emitter = require('../tool/emitter');
var util = require('../tool/util');
var EventProxy = require('eventproxy');
var proxy = new EventProxy();

function irGet (req, res, next) {


    emitter.local.get('/api/inbound_rules/list', req, function(data){

        console.log('============');
        console.log(data);

        res.render('solomon/content/inboundRules/ir',{irData : JSON.parse(data)});

    });


    //res.render('solomon/content/inboundRules/ir');


}
function addInboundRuleGet (req, res, next) {

    emitter.local.get('/api/providers/list', req, function(data){

        console.log('============');
        var result = {};
        data = util.parseJSON(data);
        //console.log(data);
        result['pData'] = data;
        console.log(result);
        res.render('solomon/content/inboundRules/addInboundRule',{type: 'add', data : result});
    });
}
function addInboundRulePost (req, res ,next) {
    console.log(req.body);
    var url = '/api/inbound_rules/update';
    emitter.local.post(url, req.body, function(data){
        res.json(data).end();
    });
}

function updateInboundRuleGet (req, res, next) {

    proxy.all('pData', 'irData', function(pData,irData) {
        var result = {};
        result['pData'] = util.parseJSON(pData);
        result['irData'] = util.parseJSON(irData);

        console.log('===========');
        console.log(result);
        console.log(result.pData.providers);

        res.render('solomon/content/inboundRules/addInboundRule',{type: 'update', data: result});
    });

    emitter.local.get('/api/inbound_rules/show', req, function(data){
        proxy.emit('irData', data);
    });
    emitter.local.get('/api/providers/list', req, function(data){
        proxy.emit('pData', data);
    });

}

function updateInboundRulePost (req, res, next) {

    console.log(req.body);
    var url = '/api/inbound_rules/update';
    emitter.local.post(url, req.body, function(data){
        res.json(data).end();
    });


}




exports.irGet = irGet;
exports.addInboundRuleGet = addInboundRuleGet;
exports.addInboundRulePost = addInboundRulePost;
exports.updateInboundRuleGet = updateInboundRuleGet;
exports.updateInboundRulePost = updateInboundRulePost;