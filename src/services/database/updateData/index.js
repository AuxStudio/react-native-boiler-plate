import firebase from 'react-native-firebase';

import { app } from '../../../utils';

export default function updateData(ref, data) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(ref)
      .update(data)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(app.createError(error));
      });
  });
}
