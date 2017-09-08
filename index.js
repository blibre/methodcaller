module.exports = new Proxy({}, {
  get : function(target, prop) {
    console.log(target, prop);
    if(target[prop] === undefined) {
      return function()  {
        console.log('an otherwise undefined function!!');
      };
    } else {
      return target[prop];
    }
  }
});