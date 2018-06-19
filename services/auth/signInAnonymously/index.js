import firebase from 'react-native-firebase';

import utils from '../../../utils';

export default function signInAnonymously() {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInAnonymouslyAndRetrieveData()
      .then((user) => {
        const response = user && { user };
        resolve(response);
      })
      .catch((error) => {
        reject(utils.app.createError(error));
      });
  });
}
