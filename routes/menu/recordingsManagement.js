function recordingsGet (req, res, next) {

    res.render('solomon/recordingsManagement/rm');

}
function addRecordingsGet (req, res, next) {

    res.render('solomon/recordingsManagement/addRecordings');

}



exports.recordingsGet = recordingsGet;
exports.addRecordingsGet = addRecordingsGet;