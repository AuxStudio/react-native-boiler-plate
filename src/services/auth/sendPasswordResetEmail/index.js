import firebase from 'react-native-firebase';

import utils from '../../../utils';

export default function sendPasswordResetEmail(email) {
  return new Promise((resolve, reject) => {
    if (email) {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(utils.app.createError(error));
        });
    } else {
      reject(new Error('Email is required'));
    }
  });
}
