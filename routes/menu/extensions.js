
var emitter = require('../tool/emitter');

function exGet (req, res, next) {



    console.log('------------ 2 ');
    console.log(req.query);


    emitter.local.get('/api/extensions/list', req, function(data){

        console.log('============');
        console.log(data);

        res.render('solomon/content/extensions/ex',{exData : JSON.parse(data)});

    });




}

function addExtensionsGet (req, res, next) {

    res.render('solomon/content/extensions/addExtension');

}
function addExtensionsPost (req, res, next) {

    //res.render('solomon/content/extensions/addExtension');


    console.log(req.query);
    console.log(req.body);

}



function getGroupManagement (req, res, next) {

    emitter.local.get('/api/extensions/group/list', req, function(data){

        console.log('============');
        console.log(data);

        res.render('solomon/content/extensions/groupManagement/groupManagement',{groupData : JSON.parse(data)});

    });



    //res.render('solomon/content/extensions/groupManagement/groupManagement');

}
function addGroup (req, res, next) {

    res.render('solomon/content/extensions/groupManagement/addGroup');

}



exports.exGet = exGet;
exports.addExtensionsGet = addExtensionsGet;
exports.addExtensionsPost = addExtensionsPost;
exports.getGroupManagement = getGroupManagement;
exports.addGroup = addGroup;