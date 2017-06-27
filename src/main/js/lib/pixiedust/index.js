import _ from 'lodash';
import runtime from './runtime';
import runner from './runner';
import components from './components/index';

import PixieDustProvider from './components/PixieDustProvider';
import React from 'react';
import ReactDOM from 'react-dom/server';

function renderToString(store, element){
  let wrappedElement = <PixieDustProvider store={store}>
    { element }
  </PixieDustProvider>;
  return ReactDOM.renderToStaticMarkup(wrappedElement);
}

export default _.assign({}, {
  runner: runner,
  Component: components,
  renderToString: renderToString
}, runtime);