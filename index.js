module.exports = new Proxy({}, {
  get : function(target, prop, args) {
    console.log(target, prop, args);
    if(target[prop] === undefined) {
      return function()  {
        console.log('an otherwise undefined function!!');
      };
    } else {
      return target[prop];
    }
  }
});