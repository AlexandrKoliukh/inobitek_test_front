import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const nodeRemovingState = handleActions({
  [actions.removeNodeRequest]() {
    return 'requested';
  },
  [actions.removeNodeFailure]() {
    return 'failed';
  },
  [actions.removeNodeSuccess]() {
    return 'finished';
  },
}, 'none');

const nodesFetchingState = handleActions({
  [actions.fetchNodesRequest]() {
    return 'requested';
  },
  [actions.fetchNodesFailure]() {
    return 'failed';
  },
  [actions.fetchNodesSuccess]() {
    return 'finished';
  },
}, 'none');

const nodes = handleActions({
  [actions.fetchNodesSuccess](state, { payload }) {
    return {
      byId: _.keyBy(payload.tasks, 'id'),
      allIds: payload.tasks.map(t => t.id),
    };
  },
  [actions.addNodeSuccess](state, { payload: { task } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [task.id]: task },
      allIds: [task.id, ...allIds],
    };
  },
  [actions.removeNodeSuccess](state, { payload: { id } }) {
    const { byId, allIds } = state;
    return {
      byId: _.omit(byId, id),
      allIds: _.without(allIds, id),
    };
  },
}, { byId: {}, allIds: [] });

export default combineReducers({
  nodeRemovingState,
  nodesFetchingState,
  nodes,
  form: formReducer,
});
