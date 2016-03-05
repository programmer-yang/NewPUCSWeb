var errors = {
  400: {'400.1': 'Request parameter format error', '400.2': 'Syntax error'},
  401: {'401.1': 'User not exist', '401.2': 'User password error'},
  403: {
    '403.1': 'Hasn’t URI access permission', '403.2': 'User already exist',
    '403.3': 'Extension already exist', '403.4': 'Access Token invalid', '403.5': 'Rate limit exceeded'
  },
  404: {'404.1': 'Extension not exist', '404.2': 'URI not exist', '404.3': 'File not found'},
  500: {'500': 'Internal Server Error'},
  503: {'503': 'Service Unavailable'}
};

exports.getError = function (code, detail, res) {
  console.log('errors.js 14 error');
  console.log(code);
  console.log(detail);

  if (errors[code] && errors[code][detail]) {
    console.log(66666);
    res.status(code).send({err_code: detail, msg: errors[code][detail]}).end();
  } else {
    //res.status(500).send({err_code: 500, msg: errors[500][500]}).end();
    res.status(500).send({err_code: 500, msg: detail}).end();
  }
};