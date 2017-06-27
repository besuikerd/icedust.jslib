import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PixieDustComponent extends Component {

}
PixieDustComponent.contextTypes = {
  store: PropTypes.object
};


function Lifted(render){
  class LiftedComponent extends PixieDustComponent {
    constructor(props, context) {
      super(props);
      this.materalize(props, context);
      this.shouldRender = true;
    }


    componentWillReceiveProps(props, context) {
      this.materalize(props, context);
    }

    materalize(props, context){
      let state = context.store.getState();
      let rendered = render(props, state);
      this.materialized = rendered.result;
      if(rendered.state !== state){
        this.stateUpdate(context, rendered.state);
      }
    }

    shouldComponentUpdate(){
      return this.shouldRender;
    }

    componentWillUpdate(){
      this.shouldRender = false;
    }

    stateUpdate(context, newState){
      console.log('state update');
      context.store.dispatch({type: 'state_update', newState: newState})
      this.shouldRender = true;
    }

    render() {
      return this.materialized;
    }
  }
  return LiftedComponent;
}
module.exports.Lifted = Lifted;

export default PixieDustComponent;