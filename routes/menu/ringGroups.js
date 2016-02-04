
var emitter = require('../tool/emitter');
var util = require('../tool/util');
var EventProxy = require('eventproxy');
var proxy = new EventProxy();

function rgGet (req, res, next) {

    emitter.local.get('/api/ring_groups/list', req, function(data){

        console.log('============');
        console.log(data);

        res.render('solomon/content/ringGroups/rg',{rgData : JSON.parse(data)});

    });

    //res.render('solomon/content/ringGroups/rg');


}
function addRingGroupGet (req, res, next) {

    var result = {};
    emitter.local.get('/api/extensions/list', req, function(data){
        result['eData'] = util.parseJSON(data);
        result['rgData'] = {};
        res.render('solomon/content/ringGroups/addRingGroup',{type: 'add', data: result });

    });
}
function addRingGroupPost (req, res, next) {
    console.log(req.body);
    var url = '/api/ring_groups/create';
    emitter.local.post(url, req.body, function(data){
        res.json(data).end();
    });
}
function updateRingGroupGet (req, res, next) {

    proxy.all('rgData', 'eData', function(rgData, eData) {
        var result = {};
        result['rgData'] = util.parseJSON(rgData);
        result['eData'] = util.parseJSON(eData);
        console.log(result);
        res.render('solomon/content/ringGroups/addRingGroup',{type: 'update', data: result });

    });
    emitter.local.get('/api/ring_groups/show', req, function(data) {
        proxy.emit('rgData', data);
    });
    emitter.local.get('/api/extensions/list', req, function(data) {
        proxy.emit('eData', data);
    });
}
function updateRingGroupPost (req, res, next) {
    console.log(req.body);
    var url = '/api/ring_groups/update';
    emitter.local.post(url, req.body, function(data){
        res.json(data).end();
    });
}





exports.rgGet = rgGet;
exports.addRingGroupGet = addRingGroupGet;
exports.updateRingGroupGet = updateRingGroupGet;
exports.addRingGroupPost = addRingGroupPost;
exports.updateRingGroupPost = updateRingGroupPost;