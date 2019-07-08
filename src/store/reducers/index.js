import { combineReducers } from 'redux';
import userReducer from './user';
import appDataReducer from './appData';
import appStateReducer from './appState';
import navigationReducer from './navigation';

const reducers = combineReducers({
  user: userReducer,
  appData: appDataReducer,
  appState: appStateReducer,
  navigation: navigationReducer,
});

export default reducers;
