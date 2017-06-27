function loadModule(program){
  var scope = {
    exports: {}
  };
  program(scope, Runtime);
  return scope.exports;
}
export default loadModule;