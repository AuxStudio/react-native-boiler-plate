import firebase from 'react-native-firebase';

import { app } from '../../../utils';

export default function disableNetwork() {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .disableNetwork()
      .then(() => resolve())
      .catch((error) => {
        reject(app.createError(error));
      });
  });
}
