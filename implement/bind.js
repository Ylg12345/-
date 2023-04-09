Function.prototype.myBind = function(context, ...args) {
  if(!context && context === null) {
    context = window;
  }

  let fn = Symbol();

  context[fn] = this;
  let _this = this;

  const result = function(...innerArgs) {
    if(this instanceof _this === true) {
      this[fn] = _this;
      this[fn](...[...args, ...innerArgs]);
      delete this[fn];
    } else {
      context[fn](...[...args, ...innerArgs]);
      delete context[fn];
    }
  };

  result.prototype = Object.create(this.prototype);
  return result;
}