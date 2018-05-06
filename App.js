import React from 'react';
import { Router } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';

import store from './store';
import navigator from './navigation';

import ErrorHandler from './containers/ErrorHandler';
import AuthHandler from './containers/AuthHandler';
import DatabaseHandler from './containers/DatabaseHandler';
import NetworkHandler from './containers/NetworkHandler';
import LocationHandler from './containers/LocationHandler';
import SnackBarHandler from './containers/SnackBarHandler';

// Connect router to store
const ConnectedRouter = connect()(Router);

export default function App() {
  return (
    <Provider store={store}>
      <ErrorHandler>
        <AuthHandler />
        <DatabaseHandler />
        <NetworkHandler />
        <LocationHandler />
        <SnackBarHandler>
          <ConnectedRouter navigator={navigator} />
        </SnackBarHandler>
      </ErrorHandler>
    </Provider>
  );
}
