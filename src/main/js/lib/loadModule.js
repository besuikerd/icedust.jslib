function loadModule(program){
  var scope = {
    exports: {}
  };
  program(scope, Runtime);
  return scope.exports;
}
module.exports = loadModule;
