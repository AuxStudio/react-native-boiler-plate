import firebase from 'react-native-firebase';

import { app } from '../../../utils';

export default function getData(ref) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(ref)
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        const response = data && { data };
        resolve(response);
      })
      .catch((error) => {
        reject(app.createError(error));
      });
  });
}
