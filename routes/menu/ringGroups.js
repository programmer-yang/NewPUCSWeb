
var emitter = require('../tool/emitter');

function rgGet (req, res, next) {

    emitter.local.get('/api/ring_groups/list', req, function(data){

        console.log('============');
        console.log(data);

        res.render('solomon/content/ringGroups/rg',{rgData : JSON.parse(data)});

    });

    //res.render('solomon/content/ringGroups/rg');


}
function addRingGroupGet (req, res, next) {

    res.render('solomon/content/ringGroups/addRingGroup');

}




exports.rgGet = rgGet;
exports.addRingGroupGet = addRingGroupGet;