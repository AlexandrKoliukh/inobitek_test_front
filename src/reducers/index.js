import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as asyncStateReducers from './asyncStateReducers';
import nodes from './nodesReducers'
import nodeDetails from './nodeDetailsReducers';
import * as uiState from './uiStateReducers';

export default combineReducers({
  ...asyncStateReducers,
  nodes,
  nodeDetails,
  ...uiState,
  form: formReducer,
});
