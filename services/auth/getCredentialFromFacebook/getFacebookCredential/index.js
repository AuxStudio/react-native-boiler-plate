import firebase from 'react-native-firebase';

import utils from '../../../../utils';

export default function getFacebookCredential(accessToken) {
  return new Promise((resolve) => {
    utils.app.log('start getFacebookCredential', { accessToken });

    const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);

    utils.app.log('end getFacebookCredential', credential);

    resolve(credential);
  });
}
