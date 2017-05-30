var _ = require('lodash');
var _redux = require('redux');
var _reactRedux = require('react-redux');
var Provider = _reactRedux.Provider;
var createStore = _redux.createStore;
var React = require('react');
var ReactDOM = require('react-dom/server');

var defaultDebug = false;
var defaultOptionalActions = ['@@redux/init', '@@INIT', '@@redux/INIT'];

var COMPOSE_ACTIONS = "composeActions";


var uniqueId = 0;
function generateUniqueId(){ //simple number generator
  return "" + uniqueId++;
}
module.exports.generateUniqueId = generateUniqueId;

function makeComposeActions(reducer){
  return function(state, message){
    for(var i = 0 ; i < message.actions.length ; i++){
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
module.exports.composeActions = composeActions;


function makeReducer(actions, debug, optionalActions){
  if(debug === undefined){
    debug = defaultDebug;
  }

  actions = _.assign({}, actions); //clone actions

  if(optionalActions === undefined){
    optionalActions = defaultOptionalActions;
  }

  function reducer(state, message){
    var action = actions[message.type];
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
      throw new Error('state became empty after action ', message.type);
    }
    return state;
  }

  actions[COMPOSE_ACTIONS] = makeComposeActions(reducer);

  if(debug) {
    return function(state, message){
      console.time(message.type);
      var result = reducer(state, message);
      console.timeEnd(message.type);
      return result;
    }
  }
  return reducer;
}
module.exports.makeReducer = makeReducer;


function makeStore(reducer, initialState){
  try{
    return createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  } catch(e){
    return createStore(reducer, initialState);
  }

}

var defaultMergeActions = false;
function memoizeComponent(component, calculations, mergeActions){
  if(mergeActions === undefined){
    mergeActions = defaultMergeActions;
  }

  var memoize = {
    memoize: function(props){

      var actions = [];
      for(var i = 0 ; i < calculations.length ; i++){
        var calc = calculations[i];
        if(props[calc.prop] == undefined){
          actions.push(calc.fn(props[calc.id]));
        }
      }

      if(actions.length !== 0){
        if(mergeActions){
          props.dispatch(composeActions(actions));
        } else{
          for(var i = 0 ; i < actions.length ; i++){
            props.dispatch(actions[i]);
          }
        }
      }
    },

    componentDidMount: function(){
      if(component.componentDidMount !== undefined){
        component.componentDidMount.apply(this);
      }
      this.memoize(this.props);
    },

    componentWillReceiveProps: function(props){
      if(component.componentWillReceiveProps !== undefined){
        component.componentWillReceiveProps.apply(this, props);
      }
      this.memoize(props)
    }
  };

  return _.assign({}, component, memoize);
}
module.exports.memoizeComponent = memoizeComponent;

function pixiedustRunner(module){
  var reducer = makeReducer(module.actions, true);
  var store = makeStore(reducer, module.emptyState);
  store.dispatch(module.actionCreators.init());
  var App = React.createElement(Provider, {
    store: store
  },
    React.createElement(module.Application)
  );
  var output = ReactDOM.renderToStaticMarkup(App);
  return output;
}
module.exports.pixiedustRunner = pixiedustRunner;