import firebase from 'react-native-firebase';

import utils from '../../../utils';

export default function signOut() {
  return new Promise((resolve, reject) => {
    utils.app.log('start signOut');

    firebase
      .auth()
      .signOut()
      .then(() => {
        utils.app.log('end signOut');

        resolve();
      })
      .catch((error) => {
        utils.app.log('end signOut', { error });

        reject(utils.app.createError(error));
      });
  });
}
