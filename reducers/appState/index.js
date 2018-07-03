import initialState from './initialState';
import utils from '../../utils';

export default function appStateReducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'TOGGLE_LOADING':
      newState = utils.objects.cloneObject(state);
      newState.loading = !newState.loading;
      return newState;

    case 'SET_DEVICE_LOCATION':
      newState = utils.objects.cloneObject(state);
      newState.deviceLocation = action.payload.coords;
      return newState;

    case 'SET_SYSTEM_MESSAGE':
      newState = utils.objects.cloneObject(state);
      newState.systemMessage = action.payload.message;
      return newState;

    case 'RESET_SYSTEM_MESSAGE':
      newState = utils.objects.cloneObject(state);
      newState.systemMessage = initialState.systemMessage;
      return newState;

    case 'SET_NETWORK_CONNECTION_INFO':
      newState = utils.objects.cloneObject(state);
      newState.network = action.payload.network;
      return newState;

    case 'ADD_PENDING_TRANSACTION':
      newState = utils.objects.cloneObject(state);
      newState.firebase.pendingTransactions.push(action.payload.event);
      return newState;

    case 'REMOVE_PENDING_TRANSACTION':
      newState = utils.objects.cloneObject(state);
      newState.firebase.pendingTransactions = newState.firebase.pendingTransactions.filter(
        (event) => {
          return event.id !== action.payload.id;
        },
      );
      return newState;

    default:
      return state;
  }
}
