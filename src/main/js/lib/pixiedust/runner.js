import loadModule from '../loadModule';
import React from 'react';
import ReactDOM from 'react-dom';

import Result from './components/Result';

import PixieDustProvider from './components/PixieDustProvider';
import PixieDustComponent from './components/PixieDustComponent';

import runtime from './runtime';

function runner(program, container){
  let module = loadModule(program);
  let state = module.emptyState;
  let init = module.init(state);
  let store = runtime.makeStore(module.reducer, init.state);
  let execute = module.execute(store, init.ids);
  let element = <PixieDustProvider store={store}>
    <Result result={execute}/>
  </PixieDustProvider>;

  setTimeout(function(){
    store.dispatch({type: 'setFile_content', id: 'f1', value: 'bla'})
  }, 1000)
  ReactDOM.render(element, container);
  console.log('result', execute);
  console.log('state', store.getState().toJS());

}

module.exports = runner;