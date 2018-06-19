import firebase from 'react-native-firebase';

import utils from '../../../utils';

export default function signOut() {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(utils.app.createError(error));
      });
  });
}
