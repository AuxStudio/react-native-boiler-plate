import firebase from 'react-native-firebase';

import { app } from '../../../utils';

export default function signInWithCredential(credential) {
  return new Promise((resolve, reject) => {
    if (credential) {
      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then((user) => {
          const response = user; // response is already keyed by user
          resolve(response);
        })
        .catch((error) => {
          reject(app.createError(error));
        });
    } else {
      reject(new Error('Credential is required'));
    }
  });
}
