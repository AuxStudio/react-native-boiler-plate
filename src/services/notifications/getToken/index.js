import firebase from 'react-native-firebase';

import utils from '../../../utils';

export default function getToken() {
  return new Promise((resolve, reject) => {
    firebase
      .messaging()
      .getToken()
      .then((fcmToken) => {
        resolve({ fcmToken });
      })
      .catch((error) => {
        reject(utils.app.createError(error));
      });
  });
}
