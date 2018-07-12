// import { ActionConst } from 'react-native-router-flux';
import initialState from './initialState';
import utils from '../../utils';

export default function navigationReducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    // NOTE: this does not work
    // case ActionConst.FOCUS:
    //   newState = utils.objects.cloneObject(state);
    //   newState.scene = action.scene; // comes from RNRF, ie. we can't control the action pattern
    //   return newState;

    case 'PUSH_PAGE':
      newState = utils.objects.cloneObject(state);
      newState.pages.push(action.payload.page);
      return newState;

    case 'POP_PAGE':
      newState = utils.objects.cloneObject(state);
      newState.pages.pop();
      return newState;

    case 'RESET_PAGES':
      newState = utils.objects.cloneObject(state);
      newState.pages = [action.payload.page];
      return newState;

    case 'REPLACE_PAGE':
      newState = utils.objects.cloneObject(state);
      newState.pages.pop();
      newState.pages.push(action.payload.page);
      return newState;

    default:
      return state;
  }
}
