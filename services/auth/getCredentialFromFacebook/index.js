import { LoginManager, AccessToken } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';

import utils from '../../../utils';

export default function getCredentialFromFacebook() {
  return new Promise((resolve, reject) => {
    utils.app.log('start getCredentialFromFacebook');

    LoginManager.logOut();
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      (result) => {
        if (result.isCancelled) {
          utils.app.log('end getcredentialFromFacebook', 'User cancelled login');

          reject(utils.app.createError('User cancelled login'));
        } else {
          AccessToken.getCurrentAccessToken()
            .then((user) => {
              const credential = firebase.auth.FacebookAuthProvider.credential(user.accessToken);
              const response = credential && { credential };

              utils.app.log('end getcredentialFromFacebook', response);

              resolve(response);
            })
            .catch((error) => {
              utils.app.log('end getcredentialFromFacebook', { error });

              reject(utils.app.createError(error));
            });
        }
      },
      (error) => {
        utils.app.log('end getcredentialFromFacebook', { error });

        reject(utils.app.createError(error));
      },
    );
  });
}
