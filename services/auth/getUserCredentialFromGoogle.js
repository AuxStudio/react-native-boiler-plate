import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import config from '../../config';

export default function getUserCredentialFromGoogle() {
  return new Promise((resolve) => {
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

                resolve({
                  payload: credential,
                });
              })
              .catch((error) => {
                resolve({
                  payload: new Error(error),
                  error: true,
                });
              });
          })
          .catch((error) => {
            resolve({
              payload: new Error(error),
              error: true,
            });
          });
      })
      .catch((error) => {
        resolve({
          payload: new Error(error),
          error: true,
        });
      });
  });
}
