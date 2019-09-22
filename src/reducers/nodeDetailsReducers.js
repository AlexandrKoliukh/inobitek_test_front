import { handleActions } from 'redux-actions';
import { fetchNodeSuccess, nodeDetailsSet } from '../actions';

const nodeDetails = handleActions({
  [fetchNodeSuccess](state, { payload }) {
    const { node } = payload.response.data;
    return {
      id: node.id,
      name: node.name,
      port: node.port,
      ip: node.ip,
      parentId: node.parentId,
    }
  },
  [nodeDetailsSet](state, { payload }) {
    const { node } = payload;
    return {
      id: node.id,
      name: node.name,
      port: node.port,
      ip: node.ip,
      parentId: node.parentId,
    }
  }
}, {});

export default nodeDetails;
