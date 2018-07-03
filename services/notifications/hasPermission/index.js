import firebase from 'react-native-firebase';

import utils from '../../../utils';

export default function hasPermission() {
  return new Promise((resolve, reject) => {
    firebase
      .messaging()
      .hasPermission()
      .then((enabled) => {
        resolve({ enabled });
      })
      .catch((error) => {
        reject(utils.app.createError(error));
      });
  });
}
