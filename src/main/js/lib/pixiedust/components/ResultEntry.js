import React, { Component } from 'react';
import _ from 'lodash';

class ResultEntry extends Component{
  render(){
    let result = this.props.result;
    let expression = result.expression;
    let value = result.value;

    let valueElementType = result.type === 'View' ? 'div' : 'pre';

    if(_.isArray(value)){
      let mapped = [];


      value = value.map(function(e, i) {
        return React.createElement('div', {key: i}, e);
      });
    }

    let title = result.expression + " :: " + result.type + result.multiplicity;
    return <div>
      <h3><pre> { title } </pre></h3>
      {React.createElement(valueElementType, {style: {whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}, value)}
    </div>;
  }
}

export default ResultEntry;