import firebase from 'react-native-firebase';

import utils from '../../../utils';

export default function enableNetwork() {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .enableNetwork()
      .then(() => resolve())
      .catch((error) => {
        reject(utils.app.createError(error));
      });
  });
}
