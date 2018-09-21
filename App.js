import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import codepush from 'react-native-code-push';

import { store, persistor } from './store';
import Routes from './scenes';

import ErrorHandler from './handlers/ErrorHandler';
import NotificationsHandler from './handlers/NotificationsHandler';
import SystemMessageHandler from './handlers/SystemMessageHandler';
import AuthHandler from './handlers/AuthHandler';
import DatabaseHandler from './handlers/DatabaseHandler';
import NetworkHandler from './handlers/NetworkHandler';
import LocationHandler from './handlers/LocationHandler';

// Helper to clear local storage during development
// if (__DEV__) {
//   persistor.purge();
// }

// Disable remote debugger warnings
console.ignoredYellowBox = ['Remote debugger', 'Warning: isMounted(...) is deprecated'];

export function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NotificationsHandler />
        <ErrorHandler>
          <SystemMessageHandler>
            <AuthHandler />
            <DatabaseHandler />
            <NetworkHandler />
            <LocationHandler />
            <Routes />
          </SystemMessageHandler>
        </ErrorHandler>
      </PersistGate>
    </Provider>
  );
}

export default codepush(App);
