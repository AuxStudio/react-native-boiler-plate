import firebase from 'react-native-firebase';

import { app } from '../../../utils';

export default function hasPermission() {
  return new Promise((resolve, reject) => {
    firebase
      .messaging()
      .hasPermission()
      .then((enabled) => {
        resolve({ enabled });
      })
      .catch((error) => {
        reject(app.createError(error));
      });
  });
}
