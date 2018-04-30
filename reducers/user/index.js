import initialState from './initialState';
import utils from '../../utils';

export default function userReducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'UPDATE_USER_EMAIL':
      newState = utils.cloneObject(state);
      newState.userEmail = action.payload;
      return newState;

    case 'UPDATE_USER_PASSWORD':
      newState = utils.cloneObject(state);
      newState.userPassword = action.payload;
      return newState;

    case 'SIGN_IN_USER':
      newState = utils.cloneObject(state);
      newState = {
        ...action.payload,
      };
      newState.authenticated = true;
      return newState;

    case 'SIGN_OUT_USER':
      newState = utils.cloneObject(state);
      newState = initialState;
      return newState;

    case 'SET_USER_PHOTO':
      newState = utils.cloneObject(state);
      newState.userPhotoURL = action.payload;
      return newState;

    default:
      return state;
  }
}
