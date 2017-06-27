var React = require('react');
var createReactClass = require('create-react-class');

var ResultEntry = require('./ResultEntry');

var Result = createReactClass({
  render : function(){
    var result = this.props.result;

    var entries = [];
    for(var i = 0 ; i < result.length ; i++){
      entries.push(React.createElement(ResultEntry, {
        key: i,
        result: result[i]
      }));
    }
    return React.createElement('div', {},
      entries
    );
  }
});

module.exports = Result;