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

const nodeFetchingState = handleActions({
  [actions.fetchNodeRequest]() {
    return 'requested';
  },
  [actions.fetchNodeFailure]() {
    return 'failed';
  },
  [actions.fetchNodeSuccess]() {
    return 'finished';
  },
}, 'none');

const nodeAddState = handleActions({
  [actions.addNodeRequest]() {
    return 'requested';
  },
  [actions.addNodeFailure]() {
    return 'failed';
  },
  [actions.addNodeSuccess]() {
    return 'finished';
  },
}, 'none');

const nodeUpdateState = handleActions({
  [actions.updateNodeRequest]() {
    return 'requested';
  },
  [actions.updateNodeFailure]() {
    return 'failed';
  },
  [actions.updateNodeSuccess]() {
    return 'finished';
  },
}, 'none');

const nodes = handleActions({
  [actions.fetchNodesSuccess](state, { payload }) {
    const { nodes } = payload.response.data;
    return {
      byId: _.keyBy(nodes, 'id'),
      allIds: nodes.map(t => t.id),
    };
  },
  [actions.addNodeSuccess](state, { payload }) {
    const { node } = payload.response.data;
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [node.id]: node },
      allIds: [...allIds, node.id],
    };
  },
  [actions.removeNodeSuccess](state, { payload }) {
    const { id } = payload.response.data;
    const { byId, allIds } = state;
    return {
      byId: _.omit(byId, id),
      allIds: _.without(allIds, id),
    };
  },
  [actions.updateNodeSuccess](state, { payload }) {
    const { node } = payload.response.data;
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [node.id]: node },
      allIds,
    };
  },
}, { byId: {}, allIds: [] });

const nodeDetails = handleActions({
  [actions.fetchNodeSuccess](state, { payload }) {
    const { node } = payload.response.data;
    return {
        id: node.id,
        name: node.name,
        port: node.port,
        ip: node.ip,
        parentId: node.parentId,
    }
  }
}, {});

export default combineReducers({
  nodeRemovingState,
  nodesFetchingState,
  nodeFetchingState,
  nodeAddState,
  nodeUpdateState,
  nodes,
  nodeDetails,
  form: formReducer,
});
