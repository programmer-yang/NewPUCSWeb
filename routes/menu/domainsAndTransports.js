
var emitter = require('../tool/emitter');
var util = require('../tool/util');
//var events = require('../tool/events');
var EventProxy = require('eventproxy');
var proxy = new EventProxy();

function dtGet (req, res, next) {

    emitter.local.get('/api/domain/show', req, function(data){

        data = util.parseJSON(data);
        console.log('============');
        console.log(data);
        if(data.err_code) {
            res.json(data).end();
            return;
        }else {
            //res.render('solomon/content/domainsAndTransports/dat',{datData : data});
            proxy.emit('domain', data);
        }
    });

    emitter.local.get('/api/transports/list', req, function(data){

        data = util.parseJSON(data);
        console.log('============');
        console.log(data);
        if(data.err_code) {
            res.json(data).end();
            return;
        }else {
            //res.render('solomon/content/domainsAndTransports/dat',{datData : data});
            proxy.emit('transports', data);
        }
    });

    proxy.all('domain', 'transports', function(domain, transports) {

        var result = {};
        result.domain = domain;
        result.transports = transports;

        res.render('solomon/content/domainsAndTransports/dat',{datData : result});


    });

    //res.render('solomon/content/domainsAndTransports/dat');

}

function updateTransportGet (req, res, next) {
    res.render('solomon/content/domainsAndTransports/addTransport');
}



exports.dtGet = dtGet;
exports.updateTransportGet = updateTransportGet;