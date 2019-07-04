import firebase from 'react-native-firebase';

import { app } from '../../../utils';

export default function getToken() {
  return new Promise((resolve, reject) => {
    firebase
      .messaging()
      .getToken()
      .then((fcmToken) => {
        resolve({ fcmToken });
      })
      .catch((error) => {
        reject(app.createError(error));
      });
  });
}
