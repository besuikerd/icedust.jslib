import React, { Component } from 'react';
import ResultEntry from './ResultEntry';

class Result extends Component{
  render(){
    let result = this.props.result;
    let entries = result.map((r, i) => <ResultEntry key={i} result={r}/>);
    return <div>
      { entries }
    </div>;
  }
}

export default Result;