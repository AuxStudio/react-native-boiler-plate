import firebase from 'react-native-firebase';

import utils from '../../../utils';

export default function sendPasswordResetEmail(email) {
  return new Promise((resolve, reject) => {
    if (email) {
      utils.app.log('start sendPasswordResetEmail', { email });

      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          utils.app.log('end sendPasswordResetEmail');

          resolve();
        })
        .catch((error) => {
          utils.app.log('end sendPasswordResetEmail', { error });

          reject(utils.app.createError(error));
        });
    } else {
      reject(new Error('Email is required'));
    }
  });
}
