import firebase from 'react-native-firebase';

import utils from '../../../utils';

export default function disableNetwork() {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .disableNetwork()
      .then(() => resolve())
      .catch((error) => {
        reject(utils.app.createError(error));
      });
  });
}
