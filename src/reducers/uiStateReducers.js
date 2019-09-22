import { handleActions } from 'redux-actions';
import { uiStateAddHeaderItem, uiStateChangeActiveHeaderItem } from '../actions';
import _ from 'lodash';

const headerState = handleActions({
  [uiStateAddHeaderItem](state, { payload }) {
    const { item } = payload;
    const newState = state.map(i => ({ ...i, active: false }));
    return [...newState, { id: item.id, name: item.name, active: true }];
  },
  [uiStateChangeActiveHeaderItem](state, { payload }) {
    const { item: activeItem } = payload;
    const newState = state.map(i => {
      if (i.id === activeItem.id) return { ...i, active: true };
      else return { ...i, active: false };
    });
    return _.dropRightWhile(newState, (i) => !i.active);
  },
}, [{ id: 0, name: 'Root', active: true }]);

export default headerState;
