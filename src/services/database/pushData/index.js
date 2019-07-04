import firebase from 'react-native-firebase';

import { app } from '../../../utils';

export default function pushData(ref, data) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(ref)
      .push(data)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(app.createError(error));
      });
  });
}
