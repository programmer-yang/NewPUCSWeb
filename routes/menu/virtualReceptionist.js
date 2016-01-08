
var emitter = require('../tool/emitter');

function vrGet (req, res, next) {


    emitter.local.get('/api/virtual_receptionist/list', req, function(data){

        console.log('============');
        console.log(data);

        res.render('solomon/content/virtualReceptionist/vr',{vrData : JSON.parse(data)});

    });

    //res.render('solomon/content/virtualReceptionist/vr');

}
function addVirtualReceptionist (req, res, next) {

    res.render('solomon/content/virtualReceptionist/addVirtualReceptionist');

}



exports.vrGet = vrGet;
exports.addVirtualReceptionist = addVirtualReceptionist;