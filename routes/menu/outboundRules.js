
var emitter = require('../tool/emitter');
var util = require('../tool/util');
var EventProxy = require('eventproxy');
var proxy = new EventProxy();

function orGet (req, res, next) {

    emitter.local.get('/api/outbound_rules/list', req, function(data){

        console.log('============');
        console.log(data);

        res.render('solomon/content/outboundRules/or',{orData : JSON.parse(data)});

    });


    //res.render('solomon/content/outboundRules/or');


}
function addOutboundRuleGet (req, res, next) {

    emitter.local.get('/api/providers/list', req, function(data){
        console.log('============');
        var result = {};
        data = util.parseJSON(data);
        result['pData'] = data;
        console.log(result);
        res.render('solomon/content/outboundRules/addOutboundRule',{type: 'add', data : result});
    });
}
function updateOutboundRuleGet (req, res, next) {

    proxy.all('pData', 'orData', function(pData, orData) {
        var result = {};
        pData = util.parseJSON(pData);
        orData = util.parseJSON(orData);
        result['pData'] = pData;
        result['orData'] = orData;
        console.log(result);

        res.render('solomon/content/outboundRules/addOutboundRule',{type: 'update', data : result});
    });

    emitter.local.get('/api/providers/list', req, function(data) {
        proxy.emit('pData', data);
    });
    emitter.local.get('/api/outbound_rules/show', req, function(data) {
        proxy.emit('orData', data);
    });
}
function addOutboundRulePost (req, res, next) {
    console.log(req.body);
    var url = '/api/outbound_rules/create';
    emitter.local.post(url, req.body, function(data){
        res.json(data).end();
    });
}
function updateOutboundRulePost (req, res, next) {
    console.log(req.body);
    var url = '/api/outbound_rules/update';
    emitter.local.post(url, req.body, function(data){
        res.json(data).end();
    });
}




exports.orGet = orGet;
exports.addOutboundRuleGet = addOutboundRuleGet;
exports.updateOutboundRuleGet = updateOutboundRuleGet;
exports.addOutboundRulePost = addOutboundRulePost;
exports.updateOutboundRulePost = updateOutboundRulePost;