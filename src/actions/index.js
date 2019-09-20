import axios from 'axios';
import { createAction } from 'redux-actions';

import routes from '../routes';

export const fetchNodesRequest = createAction('NODES_FETCH_REQUEST');
export const fetchNodesSuccess = createAction('NODES_FETCH_SUCCESS');
export const fetchNodesFailure = createAction('NODES_FETCH_FAILURE');

export const removeNodeRequest = createAction('NODES_REMOVE_REQUEST');
export const removeNodeSuccess = createAction('NODES_REMOVE_SUCCESS');
export const removeNodeFailure = createAction('NODES_REMOVE_FAILURE');

export const addNodeSuccess = createAction('NODES_ADD_SUCCESS');

export const addNode = ({ node }) => async (dispatch) => {
  const response = await axios.post(routes.nodesUrl(), { node });
  dispatch(addNodeSuccess({ node: response.data }));
};

export const removeNode = node => async (dispatch) => {
  dispatch(removeNodeRequest());
  try {
    const url = routes.nodesUrl(node.id);
    await axios.delete(url);
    dispatch(removeNodeSuccess({ id: node.id }));
  } catch (e) {
    dispatch(removeNodeFailure());
    throw e;
  }
};

export const fetchNodes = () => async (dispatch) => {
  dispatch(fetchNodesRequest());
  try {
    const url = routes.nodesUrl();
    const response = await axios.get(url);
    dispatch(fetchNodesSuccess({ node: response.data }));
  } catch (e) {
    dispatch(fetchNodesFailure());
    throw e;
  }
};
