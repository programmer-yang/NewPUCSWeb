
var emitter = require('../tool/emitter');
var util = require('../tool/util');



function exGet (req, res, next) {


    var url = '/api/extensions/list';
    //url = util.trimGetParameter(url, req.query);

    emitter.local.get(url, req, function(data){

        data = util.parseJSON(data);
        console.log('============');
        console.log(data);
        if(data.err_code) {
            res.json(data).end();
            return;
        }else {
            res.render('solomon/content/extensions/ex',{exData : data});
        }

    });

}

function addExtensionsGet (req, res, next) {

    res.render('solomon/content/extensions/addExtension',{type: 'add',data: ''});

}
function addExtensionsPost (req, res, next) {

    //res.render('solomon/content/extensions/addExtension');

    var data = req.body;
    //data.access_token = '654321';

    emitter.local.post('/api/extensions/create', data, function(data){
        res.json(data).end();
    });

}
function updateExtensionGet(req, res, next) {

    console.log('666');
    console.log(req.query);
    var url = '/api/extensions/show';
    //url = util.trimGetParameter(url,req.query);
    //console.log(url);
    emitter.local.get(url, req, function(data){
        console.log('callback');
        console.log(data);
        data = util.parseJSON(data);
        console.log(data);
        if(data && data.err_code) {
            console.log('error --- ');
        }else{
            res.render('solomon/content/extensions/addExtension',{type: 'update',data: data});
        }
    });
}

function updateExtensionPost(req, res, next) {

    console.log(req.body);
    var url = '/api/extensions/update';
    emitter.local.post(url, req.body, function(data){
        res.json(data).end();
    });

}



function extensionGroupGet (req, res, next) {

    emitter.local.get('/api/extensions/group/list', req, function(data){

        console.log('============');
        console.log(data);
        data = util.parseJSON(data);

        res.render('solomon/content/extensions/groupManagement/groupManagement',{groupData : data});

    });



    //res.render('solomon/content/extensions/groupManagement/groupManagement');

}
function addGroupGet (req, res, next) {

    res.render('solomon/content/extensions/groupManagement/addGroup', {type: 'add',data: ''});

}
function addGroupPost (req, res, next) {

    console.log(req.body);
    var url = '/api/extensions/group/create';
    emitter.local.post(url, req.body, function(data){
        res.json(data).end();
    });

}
function updateGroupGet (req, res, next) {

    console.log('666');
    console.log(req.query);
    var url = '/api/extensions/group/show';
    //url = util.trimGetParameter(url,req.query);
    //console.log(url);
    emitter.local.get(url, req, function(data) {
        console.log('callback');
        console.log(data);
        data = util.parseJSON(data);
        console.log(data);
        if(data && data.err_code) {
            console.log('error --- ');
        }else {
            res.render('solomon/content/extensions/groupManagement/addGroup',{type: 'update',data: data});
        }
    });

}
function updateGroupPost (req, res, next) {

    console.log(req.body);
    var url = '/api/extensions/group/update';
    emitter.local.post(url, req.body, function(data){
        res.json(data).end();
    });

}



exports.exGet = exGet;
exports.addExtensionsGet = addExtensionsGet;
exports.addExtensionsPost = addExtensionsPost;
exports.updateExtensionGet = updateExtensionGet;
exports.updateExtensionPost = updateExtensionPost;

exports.extensionGroupGet = extensionGroupGet;
exports.addGroupGet = addGroupGet;
exports.addGroupPost = addGroupPost;
exports.updateGroupGet = updateGroupGet;
exports.updateGroupPost = updateGroupPost;