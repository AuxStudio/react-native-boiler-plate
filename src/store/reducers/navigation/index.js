import { ActionConst } from 'react-native-router-flux';
import initialState from './initialState';
import { objects } from '../../../utils';

export default function navigationReducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case ActionConst.FOCUS:
      newState = objects.cloneObject(state);
      newState.scene = action.routeName;
      return newState;

    default:
      return state;
  }
}
