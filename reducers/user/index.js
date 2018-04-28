import initialState from './initialState';
import utils from '../../utils';

export default function userReducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'UPDATE_USER_EMAIL':
      newState = utils.cloneObject(state);
      newState.user.userEmail = action.payload;
      return newState;

    case 'UPDATE_USER_PASSWORD':
      newState = utils.cloneObject(state);
      newState.user.userPassword = action.payload;
      return newState;

    case 'SIGN_IN_USER':
      newState = utils.cloneObject(state);
      newState.user = {
        ...action.payload,
      };
      newState.user.authenticated = true;
      return newState;

    case 'SIGN_OUT_USER':
      newState = utils.cloneObject(state);
      newState.user = initialState.user;
      return newState;

    default:
      return state;
  }
}
