var oldArrayToString = Array.prototype.toString;
Array.prototype.toString = function(){
  return "[" + oldArrayToString.bind(this)() + "]";
};

console = {
  log: print,
  warn: print
};

process = {
  env: {
  }
};