var loadModule = require('./loadModule');

function runner(program){
  var module = loadModule(program);
  var state = module.emptyState;
  var init = module.init(state);
  var execute = module.execute(init.state, init.ids);
  for(var i = 0 ; i < execute.result.length ; i++){
    console.log(execute.result[i].value);
  }
}
module.exports = runner;
