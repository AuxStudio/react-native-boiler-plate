import initialState from './initialState';
import utils from '../../utils';

export default function appDataReducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'SET_DATA':
      newState = utils.cloneObject(state);
      newState[action.payload.node] = action.payload.data;
      newState.loading = false;
      newState.refreshing = false;
      return newState;

    default:
      return state;
  }
}