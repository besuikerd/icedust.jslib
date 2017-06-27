var EMPTY_ARRAY = [];
var EMPTY_OBJECT = {};

var uniqueId = 0;
function generateUniqueId(){ //simple number generator
  return "" + uniqueId++;
}

var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom/server');
var immutable = require('immutable');
var moment = require('moment');

var PixieDust = require('./lib/pixiedust/runtime');
var Expression = require('./lib/expression');
var runner = require('./lib/runner');
var loadModule = require('./lib/loadModule');


module.exports = {
  EMPTY_ARRAY: EMPTY_ARRAY,
  EMPTY_OBJECT: EMPTY_OBJECT,
  generateUniqueId: generateUniqueId,
  loadModule: loadModule,

  _: _,
  React: React,
  ReactDOM: ReactDOM,
  immutable: immutable,
  moment: moment,

  PixieDust: PixieDust,
  Expression: Expression,
  runner: runner
};