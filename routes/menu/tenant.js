
var emitter = require('../tool/emitter');

function tenantGet (req, res, next) {


    emitter.local.get('/api/tenant/list', req, function(data){

        console.log('============');
        console.log(data);

        res.render('solomon/tenants/te',{teData : JSON.parse(data)});

    });

    //res.render('solomon/tenants/te');

}
function addTenantGet (req, res, next) {

    res.render('solomon/tenants/addTenant');

}



exports.tenantGet = tenantGet;
exports.addTenantGet = addTenantGet;