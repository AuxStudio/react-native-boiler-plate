import firebase from 'react-native-firebase';

import { app } from '../../../utils';

export default function requestPermission() {
  return new Promise((resolve, reject) => {
    firebase
      .messaging()
      .requestPermission()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(app.createError(error));
      });
  });
}
