
var emitter = require('../tool/emitter');




function sexGet (req, res, next) {

    //res.render('solomon/content/systemExtensions/sex');

    emitter.local.get('/api/system_extensions/list', req, function(data){

        console.log('============');
        console.log(data);

        res.render('solomon/content/systemExtensions/sex',{seData : JSON.parse(data)});

    });

}


exports.sexGet = sexGet;