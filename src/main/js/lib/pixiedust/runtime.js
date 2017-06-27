import _ from 'lodash';
import { createStore } from 'redux';
import React from 'react'
let ReactDOM = require('react-dom/server');

let defaultDebug = false;
let defaultOptionalActions = ['@@redux/init', '@@INIT', '@@redux/INIT'];

let COMPOSE_ACTIONS = "composeActions";


let uniqueId = 0;
function generateUniqueId(){ //simple number generator
  return "" + uniqueId++;
}

function makeComposeActions(reducer){
  return function(state, message){
    for(let i = 0 ; i < message.actions.length ; i++){
      state = reducer(state, message.actions[i]);
    }
    return state;
  };
}

function composeActions(actions){
  return {
    type: COMPOSE_ACTIONS,
    actions: actions
  };
}


function makeReducer(actions, debug, optionalActions){
  if(debug === undefined){
    debug = defaultDebug;
  }

  actions = _.assign({}, actions); //clone actions

  if(optionalActions === undefined){
    optionalActions = defaultOptionalActions;
  }

  function reducer(state, message){
    let action = actions[message.type];
    if(action !== undefined){
      state = action(state, message)
    } else if(message.type !== undefined){
      if(optionalActions.indexOf(message.type) == -1){
        console.warn('unknown action: ' + message.type)
      }
    } else{
      console.warn('no message type is given')
    }
    if(state == undefined){
      throw new Error('state became empty after action ' + message.type);
    }
    return state;
  }

  actions[COMPOSE_ACTIONS] = makeComposeActions(reducer);

  if(debug) {
    return function(state, message){
      console.time(message.type);
      let result = reducer(state, message);
      console.timeEnd(message.type);
      return result;
    }
  }
  return reducer;
}


function makeStore(reducer, initialState){
  try{
    let devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
    return createStore(reducer, initialState, devtools);
  } catch(e){
    return createStore(reducer, initialState);
  }
}

export default {
  generateUniqueId: generateUniqueId,
  makeReducer: makeReducer,
  makeStore: makeStore
}