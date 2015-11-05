function dtGet (req, res, next) {

    console.log('56666666');
    res.render('solomon/content/domainsAndTransports/dat');

}

function updateTransportGet (req, res, next) {
    res.render('solomon/content/domainsAndTransports/addTransport');
}



exports.dtGet = dtGet;
exports.updateTransportGet = updateTransportGet;