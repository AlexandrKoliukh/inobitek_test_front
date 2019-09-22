import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as asyncStateReducers from './asyncStateReducers';
import nodes from './nodesReducers'
import nodeDetails from './nodeDetailsReducers';
import * as uiState from './uiStateReducers';
import * as errors from './failureReducers';

export default combineReducers({
  ...asyncStateReducers,
  nodes,
  nodeDetails,
  ...uiState,
  ...errors,
  form: formReducer,
});
