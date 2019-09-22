import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';

import * as actions from './actions';

const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);

store.dispatch(actions.fetchNodes(0));
// store.dispatch(actions.fetchNode(1));

const root = document.getElementById('root');

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  root,
);
