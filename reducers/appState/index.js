import initialState from './initialState';
import utils from '../../utils';

export default function appStateReducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'TOGGLE_LOADING':
      newState = utils.cloneObject(state);
      newState.loading = !newState.loading;
      return newState;

    case 'SET_DEVICE_LOCATION':
      newState = utils.cloneObject(state);
      newState.deviceLocation = action.payload;
      return newState;

    case 'SET_SYSTEM_MESSAGE':
      newState = utils.cloneObject(state);
      newState.systemMessage.message = action.payload.message; // instanceof Error
      newState.systemMessage.code = action.payload.code; // instanceof Error
      newState.systemMessage.error = action.error;
      return newState;

    case 'RESET_SYSTEM_MESSAGE':
      newState = utils.cloneObject(state);
      newState.systemMessage = initialState.systemMessage;
      return newState;

    case 'SET_NETWORK_CONNECTION_INFO':
      newState = utils.cloneObject(state);
      newState.network = action.payload.network;
      return newState;

    case 'TOGGLE_REALTIME_DATABASE_MODE':
      newState = utils.cloneObject(state);
      newState.realtimeDatabaseMode = !newState.realtimeDatabaseMode;
      return newState;

    default:
      return state;
  }
}
