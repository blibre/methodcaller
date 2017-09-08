module.exports = new Proxy({}, {
  apply: function(target, thisArg, args) {
    console.log(args);
  }
});