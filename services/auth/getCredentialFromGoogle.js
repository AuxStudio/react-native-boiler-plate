import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import config from '../../config';
import utils from '../../utils';

export default function getCredentialFromGoogle() {
  return new Promise((resolve, reject) => {
    utils.log('start getCredentialFromGoogle');

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

                utils.log('end getCredentialFromGoogle', { credential });

                resolve(credential);
              })
              .catch((error) => {
                utils.log('end getCredentialFromGoogle', { error });

                reject(utils.createError(error));
              });
          })
          .catch((error) => {
            utils.log('end getCredentialFromGoogle', { error });

            reject(utils.createError(error));
          });
      })
      .catch((error) => {
        utils.log('end getCredentialFromGoogle', { error });

        reject(utils.createError(error));
      });
  });
}
