
var emitter = require('../tool/emitter');
var source = require('../tool/source');
var util = require('../tool/util');

function vptGet (req, res, next) {

    emitter.local.get('/api/providers/list', req, function(data){

        console.log('============');
        console.log(data);

        res.render('solomon/content/vpt/vpt',{ptData : JSON.parse(data)});

    });

    //res.render('solomon/content/vpt/vpt');

}
function addProviderGet (req, res, next) {

    var result = {};
    result.data = {};
    result.provider = source.Provider;

    res.render('solomon/content/vpt/addProviders', {type: 'add', data: result});

}

function addProviderPost (req, res, nex) {
    console.log(req.body);
    var url = '/api/providers/create';
    emitter.local.post(url, req.body, function(data){
        res.json(data).end();
    });
}

function updateProviderGet (req, res, next) {

    var result = {};
    result.provider = source.Provider;

    var url = '/api/providers/show';
    emitter.local.get(url, req.body, function(data){
        result.data = util.parseJSON(data);

        console.log(result);

        res.render('solomon/content/vpt/addProviders', {type: 'update', data: result});
    });

}

function updateProviderPost (req, res, nex) {
    console.log(req.body);
    var url = '/api/providers/update';
    emitter.local.post(url, req.body, function(data){
        res.json(data).end();
    });
}


//function addProviderNextGet (req, res, next) {
//
//    res.render('solomon/content/vpt/addProvidersNext');
//
//}



exports.vptGet = vptGet;
exports.addProviderGet = addProviderGet;
exports.updateProviderGet = updateProviderGet;
exports.addProviderPost = addProviderPost;
exports.updateProviderPost = updateProviderPost;
//exports.addProviderNextGet = addProviderNextGet;