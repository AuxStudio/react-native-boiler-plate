import { LoginManager, AccessToken } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function getCredentialFromFacebook() {
  return new Promise((resolve, reject) => {
    utils.log('start getCredentialFromFacebook');

    LoginManager.logOut();
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      (result) => {
        if (result.isCancelled) {
          utils.log('end getcredentialFromFacebook', 'User cancelled login');

          reject(utils.createError('User cancelled login'));
        } else {
          AccessToken.getCurrentAccessToken()
            .then((user) => {
              const credential = firebase.auth.FacebookAuthProvider.credential(user.accessToken);
              const response = credential && { credential };

              utils.log('end getcredentialFromFacebook', response);

              resolve(response);
            })
            .catch((error) => {
              utils.log('end getcredentialFromFacebook', { error });

              reject(utils.createError(error));
            });
        }
      },
      (error) => {
        utils.log('end getcredentialFromFacebook', { error });

        reject(utils.createError(error));
      },
    );
  });
}
