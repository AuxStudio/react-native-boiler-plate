import { ActionConst } from 'react-native-router-flux';
import initialState from './initialState';
import utils from '../../utils';

export default function navigationReducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case ActionConst.FOCUS:
      newState = utils.objects.cloneObject(state);
      newState.scene = action.scene; // comes from RNRF, ie. we can't control the action pattern
      return newState;

    default:
      return state;
  }
}
