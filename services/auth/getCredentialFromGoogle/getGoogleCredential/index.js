import firebase from 'react-native-firebase';

import utils from '../../../../utils';

export default function getGoogleCredential(idToken, accessToken) {
  return new Promise((resolve, reject) => {
    if (idToken && accessToken) {
      utils.app.log('start getGoogleCredential', { idToken, accessToken });

      const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);

      utils.app.log('end getGoogleCredential', { credential });

      resolve(credential);
    } else if (!idToken) {
      reject(new Error('ID token is required'));
    }
    reject(new Error('Access token is required'));
  });
}
