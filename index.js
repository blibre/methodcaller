const sha1 = require('sha1');
const md5 = require('md5');
const request = require('request');

const mc_url = process.env.METHOD_CALLER_URL;
const sign = process.env.METHOD_CALLER_SIGN;

if (!mc_url) {
  throw "Es necesario definir la url para el method caller en la variable de entorno METHOD_CALLER_URL";
}

if (!sign) {
  throw "Es necesario definir el hash de identificacion para el method caller en la variable de entorno METHOD_CALLER_SIGN";
}

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
  data.signature += sha1( md5(sign) );

  data.signature = sha1(data.signature);

  if (args.length > 3) {
    throw "Se admiten solo 3 argumentos para la función";
  }

  if (args.length >= 2) {
    data.params = args[0];
    callback = args[1];
    error = args[2] || function(e){throw e};
  } else {
    data.params = ['dummy'];
  }

  let params = {
    request: JSON.stringify(data),
  };

  request.post({url: mc_url, form: params, json: true}, function (e, response, body) {

    if (typeof body !== "object") {
      error(new Error("Bad Response: " + body));
    }

    if (!body || body.success <= 0) {
      error(new Error((body && body.message) || 'Unkown Error'));
    }

    if (callback) {
      callback(body.response);
    }
  });
}

let handler = {
  get(target, propKey, receiver) {
    return (...args) => call(propKey, args);
  }
};

module.exports = new Proxy({}, handler);