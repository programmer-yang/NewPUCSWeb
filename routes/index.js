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
var virtualReceptionist = require('./menu/virtualReceptionist');
var callQueue = require('./menu/callQueue');
var conference = require('./menu/conference');
var voiceMail = require('./menu/voiceMail');
//var callHistory = require('./menu/callHistory');

var tenant = require('./menu/tenant');
var recordingsManagement = require('./menu/recordingsManagement');
var callSessions = require('./menu/callSessions');
var callReports = require('./menu/callReports');

var settings = require('./menu/settings');
var mediaServer = require('./menu/mediaServer');
var conferenceServer = require('./menu/conferenceServer');
var servicesStatus = require('./menu/servicesStatus');
var numberBlacklist = require('./menu/numberBlacklist');

var profile = require('./menu/profile');


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
 * Virtual Receptionist
 */
router.get('/callManager/virtualReceptionist', virtualReceptionist.vrGet);
router.get('/callManager/virtualReceptionist/addVirtualReceptionist', virtualReceptionist.addVirtualReceptionist);

/**
 * Call Queue
 */
router.get('/callManager/callQueue', callQueue.cqGet);
router.get('/callManager/callQueue/addQueue', callQueue.addCallQueueGet);

/**
 * Conference
 */
router.get('/callManager/conference', conference.coGet);
router.get('/callManager/conference/addRoom', conference.addRoomGet);

/**
 * Voice Mail
 */
router.get('/callManager/voiceMain', voiceMail.vmGet);

///**
// * Call History
// */
//router.get('/callManager/callHistory', callHistory.chGet);


/**
 * Tenant
 */
router.get('/tenant', tenant.tenantGet);
router.get('/tenant/addTenant', tenant.addTenantGet);
/**
 * Recordings Management
 */
router.get('/recordingsManagement', recordingsManagement.recordingsGet);
router.get('/recordingsManagement/addRecordings', recordingsManagement.addRecordingsGet);
/**
 * Call Sessions
 */
router.get('/callManager/callSessions', callSessions.csGet);
/**
 * Call Reports
 */
router.get('/callManager/callReports', callReports.crGet);
router.get('/callManager/callReports/search', callReports.searchGet);
router.get('/callManager/callReports/download', callReports.downloadGet);


/**
 * Settings
 */
router.get('/settings', settings.settingGet);
/**
 * Media Server
 */
router.get('/settings/mediaServer', mediaServer.msGet);
router.get('/settings/mediaServer/addServer', mediaServer.addServer);
/**
 * Conference Server
 */
router.get('/settings/conferenceServer', conferenceServer.csGet);
router.get('/settings/conferenceServer/addServer', conferenceServer.addServer);
/**
 * Services Status
 */
router.get('/settings/servicesStatus', servicesStatus.ssGet);
/**
 * Number Blacklist
 */
router.get('/settings/numberBlacklist', numberBlacklist.nbGet);
router.get('/settings/numberBlacklist/addBlacklist', numberBlacklist.addBlacklist);

/**
 * ProFile
 */
router.get('/profile', profile.profileGet);



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
