import React from 'react';
import { Router } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';

import store from './store';
import navigator from './navigation';

import ErrorHandler from './handlers/ErrorHandler';
import AuthHandler from './handlers/AuthHandler';
import DatabaseHandler from './handlers/DatabaseHandler';
import NetworkHandler from './handlers/NetworkHandler';
import LocationHandler from './handlers/LocationHandler';
import SnackBarHandler from './handlers/SnackBarHandler';

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
