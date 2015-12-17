function tenantGet (req, res, next) {

    res.render('solomon/tenants/te');

}
function addTenantGet (req, res, next) {

    res.render('solomon/tenants/addTenant');

}



exports.tenantGet = tenantGet;
exports.addTenantGet = addTenantGet;