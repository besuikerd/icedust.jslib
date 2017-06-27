import loadModule from './loadModule';

import _ from 'lodash';
import runtime from './pixiedust/runtime';

function runner(program){
  let module = loadModule(program);
  let state = module.emptyState;
  let init = module.init(state);
  let store = runtime.makeStore(module.reducer, init.state);
  let execute = module.execute(store, init.ids);
  for(let i = 0 ; i < execute.length ; i++){
    console.log(valueToString(execute[i].value));
  }
}

function valueToString(value){
  if(_.isArray(value)){
    return '[' + _.toString(value) + ']';
  } else if(_.isPlainObject(value)){
    return JSON.stringify(value);
  } else{
    return '' + value;
  }
}

export default runner;