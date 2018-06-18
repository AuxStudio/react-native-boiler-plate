import firebase from 'react-native-firebase';

import utils from '../../../../utils';

export default function getGoogleCredential(idToken, accessToken) {
  return new Promise((resolve) => {
    utils.app.log('start getGoogleCredential', { idToken, accessToken });

    const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);

    utils.app.log('end getGoogleCredential', { credential });

    resolve(credential);
  });
}
