var express = require('express');
var router = express.Router();
var login = require('./login/login');

var main = require('./menu/main');
var callManager = require('./menu/CallManager');
var doMainsAndTransports = require('./menu/domainsAndTransports');
var extensions = require('./menu/extensions');
var systemExtensions = require('./menu/systemExtensions');
var voIPProvidersAndTrunks = require('./menu/voIPProvidersAndTrunks');
var inboundRules = require('./menu/inboundRules');
var outboundRules = require('./menu/outboundRules');
var ringGroups = require('./menu/ringGroups');
var callSessions = require('./menu/callSessions');
var callHistory = require('./menu/callHistory');

var mediaServer = require('./menu/mediaServer');
var conferenceServer = require('./menu/conferenceServer');
var virtualReceptionist = require('./menu/virtualReceptionist');
var settings = require('./menu/settings');



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
router.get('/index',login.indexGet);


/**
 * 首页内容请求
 */
router.get('/main', main.mainGet);

/**
 * CallManager Information
 */
router.get('/callManager/information', callManager.cmiGet);
/**
 * DomainsAndTransports
 */
router.get('/callManager/domain', doMainsAndTransports.dtGet);
router.get('/callManager/domain/transports', doMainsAndTransports.updateTransportGet);
/**
 * Extensions
 */
router.get('/callManager/extensions', extensions.exGet);
router.get('/callManager/extensions/extension', extensions.addExtensionsGet);

router.get('/callManager/extensions/getGroupManagement', extensions.getGroupManagement);
router.get('/callManager/extensions/getGroupManagement/addGroup', extensions.addGroup);
/**
 * System Extensions
 */
router.get('/callManager/systemExtensions', systemExtensions.sexGet);

/**
 * VoIP Providers Trunks
 */
router.get('/callManager/voIp', voIPProvidersAndTrunks.vptGet);
router.get('/callManager/voIp/provider', voIPProvidersAndTrunks.addProviderGet);
router.get('/callManager/voIp/provider/next', voIPProvidersAndTrunks.addProviderNextGet);

/**
 * Inbound Rules
 */
router.get('/callManager/inbound', inboundRules.irGet);
router.get('/callManager/inbound/rule', inboundRules.addInboundRuleGet);

/**
 * Outbound Rules
 */
router.get('/callManager/outbound', outboundRules.orGet);
router.get('/callManager/outbound/rule', outboundRules.addOutboundRuleGet);

/**
 * Ring Groups
 */
router.get('/callManager/ringGroups', ringGroups.rgGet);
router.get('/callManager/ringGroups/ringGroup', ringGroups.addRingGroupGet);

/**
 * Digital Receptionist
 */
router.get('/callManager/virtualReceptionist', virtualReceptionist.vrGet);
router.get('/callManager/virtualReceptionist/addVirtualReceptionist', virtualReceptionist.addVirtualReceptionist);

/**
 * Call Sessions
 */
router.get('/callManager/callSessions', callSessions.csGet);

/**
 * Call History
 */
router.get('/callManager/callHistory', callHistory.chGet);


/**
 * Media Server
 */
router.get('/mediaServer', mediaServer.msGet);
router.get('/mediaServer/addServer', mediaServer.addServer);

/**
 * Conference Server
 *
 */
router.get('/conferenceServer', conferenceServer.csGet);
router.get('/conferenceServer/addServer', conferenceServer.addServer);

/**
 * Settings
 */
router.get('/settings', settings.settingGet);

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
