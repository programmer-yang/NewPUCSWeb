var emitter = require('../tool/emitter');
var util = require('../tool/util');

function vrGet(req, res, next) {


  emitter.local.get('/api/virtual_receptionist/list', req, function (data) {

    console.log('============');
    console.log(data);
    data = util.parseJSON(data);

    res.render('solomon/content/virtualReceptionist/vr', {vrData: data});

  });

  //res.render('solomon/content/virtualReceptionist/vr');

}
function addVirtualReceptionistGet(req, res, next) {

  res.render('solomon/content/virtualReceptionist/addVirtualReceptionist', {type: 'add', vrData: {}});

}
function addVirtualReceptionistPost(req, res, next) {

  console.log(req.body);
  var url = '/api/virtual_receptionist/create';
  emitter.local.post(url, req.body, function(data){
    res.json(data).end();
  });

}
function updateVirtualReceptionistGet(req, res, next) {

  emitter.local.get('/api/virtual_receptionist/show', req, function (data) {

    console.log('============');
    console.log(data);
    data = util.parseJSON(data);
    res.render('solomon/content/virtualReceptionist/addVirtualReceptionist', {type: 'update', vrData: data});

  });

  //res.render('solomon/content/virtualReceptionist/addVirtualReceptionist');

}
function updateVirtualReceptionistPost(req, res, next) {

  console.log(req.body);
  var url = '/api/virtual_receptionist/update';
  emitter.local.post(url, req.body, function(data){
    res.json(data).end();
  });

}


exports.vrGet = vrGet;
exports.addVirtualReceptionistGet = addVirtualReceptionistGet;
exports.addVirtualReceptionistPost = addVirtualReceptionistPost;
exports.updateVirtualReceptionistGet = updateVirtualReceptionistGet;
exports.updateVirtualReceptionistPost = updateVirtualReceptionistPost;