module.exports = new Proxy(function(){
   console.log("target");
  }, {
  apply: function(target, thisArg, args) {
    console.log(args);
  }
});