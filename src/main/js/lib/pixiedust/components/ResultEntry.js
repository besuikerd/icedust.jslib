var React = require('react');
var createReactClass = require('create-react-class');
var _ = require('lodash');

var ResultEntry = createReactClass({
  render : function(){
    var result = this.props.result;
    var expression = result.expression;
    var value = result.value;

    var valueElementType = result.type === 'View' ? 'div' : 'pre';

    if(_.isArray(value)){
      var mapped = [];


      value = value.map(function(e, i) {
        console.log(i)
        return React.createElement('div', {key: i}, e);
      });
    }

    var title = result.expression + " :: " + result.type + result.multiplicity;
    return React.createElement('div', {},
      React.createElement('h3', {},
        React.createElement('pre', {},
          title
        )
      ),
      React.createElement(valueElementType, {style: {whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}, value)
    );
  }
});


module.exports = ResultEntry;