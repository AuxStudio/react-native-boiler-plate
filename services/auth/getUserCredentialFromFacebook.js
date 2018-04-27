import { LoginManager, AccessToken } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import config from '../../config';

export default function getUserCredentialFromFacebook() {
  return new Promise((resolve) => {
    LoginManager.logOut();
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      (result) => {
        if (result.isCancelled) {
          resolve({
            payload: config.messages.auth.facebook.loginCancelled,
            error: true,
          });
        } else {
          AccessToken.getCurrentAccessToken()
            .then((user) => {
              const credential = firebase.auth.FacebookAuthProvider.credential(user.accessToken);

              resolve({
                payload: credential,
              });
            })
            .catch((error) => {
              resolve({
                payload: error,
                error: true,
              });
            });
        }
      },
      (error) => {
        resolve({
          payload: error,
          error: true,
        });
      },
    );
  });
}
