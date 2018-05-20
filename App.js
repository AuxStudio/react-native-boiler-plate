import React from 'react';
import { Router } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';
import navigator from './navigation';

import SystemMessageHandler from './handlers/SystemMessageHandler';
import AuthHandler from './handlers/AuthHandler';
import DatabaseHandler from './handlers/DatabaseHandler';
import NetworkHandler from './handlers/NetworkHandler';
import LocationHandler from './handlers/LocationHandler';

// Connect router to store
const ConnectedRouter = connect()(Router);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SystemMessageHandler>
          <AuthHandler />
          <DatabaseHandler />
          <NetworkHandler />
          <LocationHandler />
          <ConnectedRouter navigator={navigator} />
        </SystemMessageHandler>
      </PersistGate>
    </Provider>
  );
}
