import firebase from 'react-native-firebase';

import utils from '../../../utils';

export default function signInWithCredential(credential) {
  return new Promise((resolve, reject) => {
    if (credential) {
      utils.app.log('start signInWithCredential', { credential });

      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then((user) => {
          const response = user; // response is already keyed by user
          utils.app.log('end signInWithCredential', response);

          resolve(response);
        })
        .catch((error) => {
          utils.app.log('end signInWithCredential', { error });

          reject(utils.app.createError(error));
        });
    } else {
      reject(new Error('Credential is required'));
    }
  });
}
