import firebase from 'react-native-firebase';

import utils from '../../../../utils';

export default function getFacebookCredential(accessToken) {
  return new Promise((resolve, reject) => {
    if (accessToken) {
      utils.app.log('start getFacebookCredential', { accessToken });

      const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);

      utils.app.log('end getFacebookCredential', credential);

      resolve(credential);
    } else {
      reject(new Error('Access token is required'));
    }
  });
}
