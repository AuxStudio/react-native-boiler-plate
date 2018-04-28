import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import config from '../../config';

export default function getUserCredentialFromGoogle() {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log('Getting user credential from Google');
    }

    GoogleSignin.hasPlayServices({ autoResolve: true })
      .then(() => {
        GoogleSignin.configure({
          ...config.googleSignIn,
        })
          .then(() => {
            GoogleSignin.signIn()
              .then((user) => {
                const credential = firebase.auth.GoogleAuthProvider.credential(
                  user.idToken,
                  user.accessToken,
                );

                resolve(credential);
              })
              .catch((error) => {
                reject(new Error(error));
              });
          })
          .catch((error) => {
            reject(new Error(error));
          });
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
