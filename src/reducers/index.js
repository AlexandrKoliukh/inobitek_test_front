import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as asyncStateReducers from './asyncStateReducers';
import nodes from './nodesReducers'
import nodeDetails from './nodeDetailsReducers';

export default combineReducers({
  ...asyncStateReducers,
  nodes,
  nodeDetails,
  form: formReducer,
});
