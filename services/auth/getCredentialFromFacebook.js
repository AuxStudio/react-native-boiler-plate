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

              utils.log('end getcredentialFromFacebook', { credential });

              resolve(credential);
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
