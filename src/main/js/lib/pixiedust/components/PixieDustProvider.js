import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

class PixieDustProvider extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.store.subscribe(() => {
      this.forceUpdate();
    })
  }

  getChildContext(){
    return {
      store: this.props.store
    }
  }
  render(){
    return Children.only(this.props.children);
  }
}
PixieDustProvider.childContextTypes = {
  store: PropTypes.object
};

export default PixieDustProvider;