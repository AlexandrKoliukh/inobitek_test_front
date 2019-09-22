import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import _ from 'lodash';

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

export default nodes;
