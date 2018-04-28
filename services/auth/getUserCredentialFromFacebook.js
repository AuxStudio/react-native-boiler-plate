import { LoginManager, AccessToken } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import config from '../../config';

export default function getUserCredentialFromFacebook() {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log('Getting user credential from facebook');
    }

    LoginManager.logOut();
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      (result) => {
        if (result.isCancelled) {
          reject(new Error(config.messages.auth.facebook.loginCancelled));
        } else {
          AccessToken.getCurrentAccessToken()
            .then((user) => {
              const credential = firebase.auth.FacebookAuthProvider.credential(user.accessToken);

              resolve(credential);
            })
            .catch((error) => {
              reject(new Error(error));
            });
        }
      },
      (error) => {
        reject(new Error(error));
      },
    );
  });
}
