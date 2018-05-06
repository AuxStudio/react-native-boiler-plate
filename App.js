import React from 'react';
import { Router } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import { View } from 'react-native';

import store from './store';
import navigator from './navigation';

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
      <View style={{ flex: 1 }}>
        <AuthHandler />
        <DatabaseHandler />
        <NetworkHandler />
        <LocationHandler />
        <SnackBarHandler>
          <ConnectedRouter navigator={navigator} />
        </SnackBarHandler>
      </View>
    </Provider>
  );
}
