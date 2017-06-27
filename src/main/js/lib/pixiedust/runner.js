var loadModule = require('../loadModule');
var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');

var Result = require('./components/Result');

function runner(program, container){
  var module = loadModule(program);
  var state = module.emptyState;
  var init = module.init(state);
  var execute = module.execute(init.state, init.ids);

  var element = React.createElement(Result, {
    result : execute.result
  });
  ReactDOM.render(element, container);
  console.log('result', execute.result);
  console.log('state', execute.state.toJS());
}

module.exports = runner;