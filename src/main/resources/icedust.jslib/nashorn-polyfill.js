// var oldArrayToString = Array.prototype.toString;
// Array.prototype.toString = function(){
//   return "[" + oldArrayToString.bind(this)() + "]";
// };

// var oldObjectToString = Object.prototype.toString;
// Object.prototype.toString = function(){
//   var result = "{";
//   var isFirstElement = true;
//   for(var key in Object.keys(this)){
//
//     if(this.hasOwnProperty(key)){
//       if(isFirstElement){
//         isFirstElement = false;
//       } else{
//         result = result + ', ';
//       }
//       result += key + ' : ' + this[key].toString();
//     }
//   }
//   return result + "}";
// };

console = {
  log: print,
  warn: print,
  error: print
};

process = {
  env: {
    NODE_ENV:'production'
  }
};