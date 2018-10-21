import initialState from './initialState';
import utils from '../../utils';

export default function userReducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'SIGN_IN_USER':
      newState = utils.objects.cloneObject(state);

      // On first app load, user is "user._user", subsequent app loads it is user.user._user"
      const user = action.payload.user._user || action.payload.user.user._user; // eslint-disable-line
      newState = {
        ...user,
      };
      newState.authenticated = true;
      return newState;

    case 'UPDATE_USER_DATA': {
      newState = utils.objects.cloneObject(state);

      // Get the ref from the key of the payload
      const refs = Object.keys(action.payload);
      const ref = refs[0];

      newState[ref] = action.payload[ref];
      return newState;
    }

    case 'SIGN_OUT_USER':
      newState = utils.objects.cloneObject(state);
      newState = initialState;
      return newState;

    default:
      return state;
  }
}
