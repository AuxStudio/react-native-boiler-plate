import initialState from './initialState';
import utils from '../../utils';

export default function userReducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'UPDATE_USER_EMAIL':
      newState = utils.cloneObject(state);
      newState.email = action.payload.email;
      return newState;

    case 'UPDATE_USER_PASSWORD':
      newState = utils.cloneObject(state);
      newState.password = action.payload.password;
      return newState;

    case 'SIGN_IN_USER':
      newState = utils.cloneObject(state);
      newState = {
        ...action.payload._user,
      };
      newState.authenticated = true;
      return newState;

    case 'SIGN_OUT_USER':
      newState = utils.cloneObject(state);
      newState = initialState;
      return newState;

    case 'SET_USER_PHOTO':
      newState = utils.cloneObject(state);
      newState.userPhotoURL = action.payload.url;
      return newState;

    default:
      return state;
  }
}
