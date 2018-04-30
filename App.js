import React from 'react';
import { Router } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';

import { store } from './store';
import navigator from './navigation';

// Connect router to store
const ConnectedRouter = connect()(Router);

// Wrappers
// import AuthHandler from "./wrappers/AuthHandler";
// import DataHandler from "./wrappers/DataHandler";
// import NetworkHandler from "./wrappers/NetworkHandler";
// import GeolocationHandler from "./wrappers/GeolocationHandler";
// import SnackBarHandler from "./wrappers/SnackBarHandler";

export default function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter navigator={navigator} />
    </Provider>
  );
}
