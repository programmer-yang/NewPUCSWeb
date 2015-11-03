var express = require('express');
var router = express.Router();
var login = require('./login/login');

var callManager = require('./menu/callManager');
var doMansAndTransports = require('./menu/domainsAndTransports');
var extensions = require('./menu/extensions');
var systemExtensions = require('./menu/systemExtensions');


var api = require('./menu/api');
var error = require('./error/error');


///* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

/**
 * 根目录请求
 */
//router.get('/', login.mainGet);
router.get('/login', login.loginGet);


/**
 * 登陆请求
 */
router.post('/login',login.loginPost);


/**
 * 首页请求
 */
router.get('/main',login.mainGet);

/**
 * CallManager Information Show Page
 */
router.get('/callManager/information', callManager.cmiGet);
/**
 * DomainsAndTransports show Page
 */
router.get('/callManager/setting', doMansAndTransports.dtGet);
router.get('/callManager/setting/transports', doMansAndTransports.updateTransportGet);
/**
 * Extensions show Page
 */
router.get('/callManager/extensions', extensions.exGet);
/**
 * System Extensions show Page
 */
router.get('/callManager/systemExtensions', systemExtensions.sexGet);





/**
 * APi Get 请求
 * 展示API页面
 */
router.get('/api', api.apiGet);



///**
// * Error Get 请求
// * 展示404页面
// */
//router.get('/error', error.error404Get);







module.exports = router;
