
var emitter = require('../tool/emitter');

function vptGet (req, res, next) {

    emitter.local.get('/api/providers/list', req, function(data){

        console.log('============');
        console.log(data);

        res.render('solomon/content/vpt/vpt',{ptData : JSON.parse(data)});

    });

    //res.render('solomon/content/vpt/vpt');

}
function addProviderGet (req, res, next) {

    res.render('solomon/content/vpt/addProviders');

}
function addProviderNextGet (req, res, next) {

    res.render('solomon/content/vpt/addProvidersNext');

}



exports.vptGet = vptGet;
exports.addProviderGet = addProviderGet;
exports.addProviderNextGet = addProviderNextGet;