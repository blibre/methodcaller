let call = function(method, args) {
  console.log(method, args);
}

let handler = {
    get(target, propKey, receiver) {
        return (...args) => call(propKey, args);
    }
};

module.exports = new Proxy({}, handler);