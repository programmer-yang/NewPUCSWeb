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




api.post('/account/verify_credentials', function (req, res, next) {

    if (!req.body.username || !req.body.username) {

        ef.getError('400', '400.1', res);

    } else {

        ///account/verify_credentials

        emitter.post('/account/verify_credentials', req.body, function (err, response, body) {

            if(err) {
                console.log('errrrrrrr');
                ef.getError('500', '500', res);
                return;
            }
            var code = response.statusCode;
            console.log('status : ' + code);
            res.status(code).send(body).end();

        });
    }

});

api.get('/account/verify_credentials', function (req, res, next) {

    console.log(req.query);
    console.log(req.body);
    res.end();

});


module.exports = api;






