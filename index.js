module.exports = new Proxy({}, {
  get : function(target, prop, other) {
    console.log(target, prop);
    console.log(other);
    if(target[prop] === undefined) {
      return function()  {
        console.log('an otherwise undefined function!!');
      };
    } else {
      return target[prop];
    }
  }
});