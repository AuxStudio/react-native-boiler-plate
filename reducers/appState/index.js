import initialState from './initialState';
import utils from '../../utils';

export default function appStateReducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'SET_APP_START':
      newState = utils.cloneObject(state);
      newState.appState.appStart = !newState.appState.appStart;
      return newState;

    case 'TOGGLE_LOADING':
      newState = utils.cloneObject(state);
      newState.appState.loading = !newState.appState.loading;
      return newState;

    case 'SET_DEVICE_LOCATION':
      newState = utils.cloneObject(state);
      newState.appState.deviceLocation = action.payload;
      return newState;

    case 'SET_TEMPORARY_IMAGE':
      newState = utils.cloneObject(state);
      newState.appState.temporaryImage = action.payload;
      return newState;

    case 'CLEAR_TEMPORARY_IMAGE':
      newState = utils.cloneObject(state);
      newState.appState.temporaryImage = null;
      return newState;

    case 'SET_USER_PHOTO':
      newState = utils.cloneObject(state);
      newState.userData.profile.userPhotoURL = action.payload;
      return newState;

    case 'TOGGLE_FEEDBACK_POSTED':
      newState = utils.cloneObject(state);
      newState.appState.feedbackPosted = !newState.appState.feedbackPosted;
      newState.appState.loading = false;
      return newState;

    case 'SET_MESSAGE':
      newState = utils.cloneObject(state);
      newState.appState.error = {
        ...action.payload,
      };
      return newState;

    case 'RESET_MESSAGE':
      newState = utils.cloneObject(state);
      newState.appState.error = initialState.appState.error;
      return newState;

    default:
      return state;
  }
}
