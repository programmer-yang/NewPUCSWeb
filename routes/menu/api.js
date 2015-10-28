/**
 * API GET function
 * show API PAGE
 */
function apiGet(req, res, next) {
    res.render('api/api');
}



exports.apiGet = apiGet;