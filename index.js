const sha1 = require('sha1');
const md5 = require('md5');
const request = require('request');

let call = function(method, args) {

  let callback = null;

  if ( !method.includes("_") ) {
    throw "Formato de funcion inválido";
  }

  let data = {
      method: method.replace('_', ':'),
      user: 0,
      params: {},
  };

  data.signature = data.method;
  data.signature += data.user;
  data.signature += sha1( md5("wertyuhjc76091+**FS%&&/TBsadasdas") );

  data.signature = sha1(data.signature);

  if (args.length > 2) {
    throw "Se admiten solo 2 argumentos para la función";
  }

  if (args.length == 2) {
    data.params = args[0];
    callback = args[1];
  } else {
    data.params = ['dummy'];
  }

  let params = {
    request: data,
  };

  let url = "http://api.buscalibre.local/local_ws.php/wsbknd";
  console.log(params);

  request.post({url: url, form: params}, function (e, r, response) {

    if (typeof response !== "object") {
      throw "Bad Response: " + response;
    }

    if (callback) {
      callback(response.response);
    }
  });
}

let handler = {
  get(target, propKey, receiver) {
    return (...args) => call(propKey, args);
  }
};

module.exports = new Proxy({}, handler);