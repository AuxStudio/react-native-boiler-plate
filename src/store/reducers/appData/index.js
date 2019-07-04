import initialState from './initialState';
import { objects } from '../../../utils';

export default function appDataReducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'SET_APP_DATA':
      newState = objects.cloneObject(state);
      newState[action.payload.ref] = action.payload.data;
      return newState;

    default:
      return state;
  }
}
