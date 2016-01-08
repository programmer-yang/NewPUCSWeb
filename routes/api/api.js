/**
 *
 * 定义对外提供的API
 *
 **/



var express = require('express');
var api = express.Router();

var emitter = require('../tool/emitter');

var events = require('../tool/events');
var ef = require('../tool/errors');




api.post('/api/account/verify_credentials', function (req, res, next) {

    if (!req.body.username || !req.body.username) {

        ef.getError('400', '400.1', res);

    } else {

        ///account/verify_credentials

        emitter.post('/api/account/verify_credentials', req.body, function (err, response, body) {

            if(err) {
                ef.getError('500', '500', res);
                return;
            }
            var code = response.statusCode;
            //console.log('status : ' + code);
            res.status(code).send(body).end();

        });
    }

});

/**
 * Call Manager  BEGIN
 */
/**
 * Extensions
 */
api.get('/api/extensions/list', function (req, res, next) {

    emitter.get('/api/extensions/list', req, function (err, response, body) {

        if(err) {
            ef.getError('500', '500', res);
            return;
        }
        var code = response.statusCode;
        //console.log('status : ' + code);
        res.status(code).send(body).end();

    });

});
/**
 * Group Management
 */
api.get('/api/extensions/group/list', function(req, res, next){
    emitter.get('/api/extensions/group/list', req, function (err, response, body) {

        if(err) {
            ef.getError('500', '500', res);
            return;
        }
        var code = response.statusCode;
        console.log('status : ' + code);
        res.status(code).send(body).end();

    });
});
/**
 * System Extensions
 */
api.get('/api/system_extensions/list', function(req, res, next){
    emitter.get('/api/system_extensions/list', req, function (err, response, body) {

        if(err) {
            ef.getError('500', '500', res);
            return;
        }
        var code = response.statusCode;
        //console.log('status : ' + code);
        res.status(code).send(body).end();

    });
});

/**
 * System Extensions
 */
api.get('/api/providers/list', function(req, res, next){
    emitter.get('/api/providers/list', req, function (err, response, body) {

        if(err) {
            ef.getError('500', '500', res);
            return;
        }
        var code = response.statusCode;
        //console.log('status : ' + code);
        res.status(code).send(body).end();

    });
});

/**
 * Inbound Rules
 */
api.get('/api/inbound_rules/list', function(req, res, next) {
    emitter.get('/api/inbound_rules/list', req, function (err, response, body) {

        if(err) {
            ef.getError('500', '500', res);
            return;
        }
        var code = response.statusCode;
        //console.log('status : ' + code);
        res.status(code).send(body).end();

    });
});

/**
 * Outbound Rules
 */
api.get('/api/outbound_rules/list', function(req, res, next) {
    emitter.get('/api/outbound_rules/list', req, function (err, response, body) {

        if(err) {
            ef.getError('500', '500', res);
            return;
        }
        var code = response.statusCode;
        //console.log('status : ' + code);
        res.status(code).send(body).end();

    });
});

/**
 * Ring Groups
 */
api.get('/api/ring_groups/list', function(req, res, next) {
    emitter.get('/api/ring_groups/list', req, function (err, response, body) {

        if(err) {
            ef.getError('500', '500', res);
            return;
        }
        var code = response.statusCode;
        //console.log('status : ' + code);
        res.status(code).send(body).end();

    });
});
/**
 * Virtual Receptionist
 */
api.get('/api/virtual_receptionist/list', function(req, res, next) {
    emitter.get('/api/virtual_receptionist/list', req, function (err, response, body) {

        if(err) {
            ef.getError('500', '500', res);
            return;
        }
        var code = response.statusCode;
        //console.log('status : ' + code);
        res.status(code).send(body).end();

    });
});
/**
 * Call Queue
 */
api.get('/api/call_queues/list', function(req, res, next) {
    emitter.get('/api/call_queues/list', req, function (err, response, body) {

        if(err) {
            ef.getError('500', '500', res);
            return;
        }
        var code = response.statusCode;
        //console.log('status : ' + code);
        res.status(code).send(body).end();

    });
});
/**
 * Conference
 */
api.get('/api/conference_server/room/list', function(req, res, next) {
    emitter.get('/api/conference_server/room/list', req, function (err, response, body) {

        if(err) {
            ef.getError('500', '500', res);
            return;
        }
        var code = response.statusCode;
        //console.log('status : ' + code);
        res.status(code).send(body).end();

    });
});


/**
 * Tenant
 */
api.get('/api/tenant/list', function(req, res, next) {
    emitter.get('/api/tenant/list', req, function (err, response, body) {

        if(err) {
            ef.getError('500', '500', res);
            return;
        }
        var code = response.statusCode;
        //console.log('status : ' + code);
        res.status(code).send(body).end();

    });
});

/**
 * Recordings
 */
api.get('/api/recordings/list', function(req, res, next) {
    emitter.get('/api/recordings/list', req, function (err, response, body) {

        if(err) {
            ef.getError('500', '500', res);
            return;
        }
        var code = response.statusCode;
        //console.log('status : ' + code);
        res.status(code).send(body).end();

    });
});

/**
 * Call Sessions
 */
api.get('/api/call_sessions/list', function(req, res, next) {
    emitter.get('/api/call_sessions/list', req, function (err, response, body) {

        if(err) {
            ef.getError('500', '500', res);
            return;
        }
        var code = response.statusCode;
        //console.log('status : ' + code);
        res.status(code).send(body).end();

    });
});

/**
 * Call Reports
 */
api.get('/api/call_reports/list', function(req, res, next) {
    emitter.get('/api/call_reports/list', req, function (err, response, body) {

        if(err) {
            ef.getError('500', '500', res);
            return;
        }
        var code = response.statusCode;
        //console.log('status : ' + code);
        res.status(code).send(body).end();

    });
});










module.exports = api;






