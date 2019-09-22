import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const dbErrors = handleActions({
  [actions.addNodeFailure](state) {
    return {
      ...state,
      addError: true,
    }
  },
  [actions.addNodeSuccess](state) {
    return {
      ...state,
      addError: false,
    }
  }
}, { updateError: false, addError: false, fetchError: false });
