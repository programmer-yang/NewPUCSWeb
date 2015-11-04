function dtGet (req, res, next) {

    console.log('56666666');
    res.render('solomon/main/doMainsAndTransports/dat');

}

function updateTransportGet (req, res, next) {
    res.render('solomon/main/doMainsAndTransports/addTransport');
}



exports.dtGet = dtGet;
exports.updateTransportGet = updateTransportGet;