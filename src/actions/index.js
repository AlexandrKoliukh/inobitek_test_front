import axios from 'axios';
import { createAction } from 'redux-actions';

import routes from '../routes';

export const fetchNodesRequest = createAction('NODES_FETCH_REQUEST');
export const fetchNodesSuccess = createAction('NODES_FETCH_SUCCESS');
export const fetchNodesFailure = createAction('NODES_FETCH_FAILURE');

export const fetchNodeRequest = createAction('NODE_FETCH_REQUEST');
export const fetchNodeSuccess = createAction('NODE_FETCH_SUCCESS');
export const fetchNodeFailure = createAction('NODE_FETCH_FAILURE');

export const removeNodeRequest = createAction('NODES_REMOVE_REQUEST');
export const removeNodeSuccess = createAction('NODES_REMOVE_SUCCESS');
export const removeNodeFailure = createAction('NODES_REMOVE_FAILURE');

export const addNodeRequest = createAction('NODES_ADD_REQUEST');
export const addNodeSuccess = createAction('NODES_ADD_SUCCESS');
export const addNodeFailure = createAction('NODES_ADD_FAILURE');

export const updateNodeRequest = createAction('NODES_UPDATE_REQUEST');
export const updateNodeSuccess = createAction('NODES_UPDATE_SUCCESS');
export const updateNodeFailure = createAction('NODES_UPDATE_FAILURE');

export const addNode = (node) => async (dispatch) => {
  dispatch(addNodeRequest());
  try {
    const url = routes.nodeAddUrl();
    const response = await axios.post(url, node);
    const newNode = response.data;
    dispatch(addNodeSuccess({ node: newNode }));
  } catch (e) {
    dispatch(addNodeFailure());
    throw e;
  }
};

export const removeNode = node => async (dispatch) => {
  dispatch(removeNodeRequest());
  try {
    const url = routes.nodeRemoveUrl();
    await axios.delete(url, node.id);
    dispatch(removeNodeSuccess({ id: node.id }));
  } catch (e) {
    dispatch(removeNodeFailure());
    throw e;
  }
};

export const fetchNodes = (parentId) => async (dispatch) => {
  dispatch(fetchNodesRequest());
  try {
    const url = routes.nodesUrl(parentId);
    const response = await axios.get(url);
    dispatch(fetchNodesSuccess({ nodes: response.data }));
  } catch (e) {
    dispatch(fetchNodesFailure());
    throw e;
  }
};

export const fetchNode = (id) => async (dispatch) => {
  dispatch(fetchNodeRequest());
  try {
    const url = routes.nodeUrl(id);
    const response = await axios.get(url);
    const node = response.data;
    dispatch(fetchNodeSuccess({ node }));
  } catch (e) {
    dispatch(fetchNodeFailure());
    throw e;
  }
};

export const updateNode = (node) => async (dispatch) => {
  dispatch(updateNodeRequest());
  try {
    const url = routes.nodeUpdateUrl();
    const response = await axios.put(url, node);
    dispatch(updateNodeSuccess({ nodes: response.data }));
  } catch (e) {
    dispatch(updateNodeFailure());
    throw e;
  }
};
