import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';

import Home from '../pages/Home';

const navigator = Actions.create(
  <Scene key="root" hideNavBar>
    <Scene key="home" component={Home} initial />
  </Scene>,
);

export default navigator;
