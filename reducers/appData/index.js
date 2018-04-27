import initialState from './initialState';
import utils from '../../utils';

export default function appDataReducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'SET_DATA':
      newState = utils.cloneObject(state);
      newState.appData[action.node] = action.payload;
      newState.appState.loading = false;
      newState.appState.refreshing = false;
      return newState;

    default:
      return state;
  }
}
