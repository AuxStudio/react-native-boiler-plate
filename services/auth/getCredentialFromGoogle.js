import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import config from '../../config';
import utils from '../../utils';

export default function getCredentialFromGoogle() {
  return new Promise((resolve, reject) => {
    utils.app.log('start getCredentialFromGoogle');

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
                const response = credential && { credential };

                utils.app.log('end getCredentialFromGoogle', response);

                resolve(response);
              })
              .catch((error) => {
                utils.app.log('end getCredentialFromGoogle', { error });

                reject(utils.app.createError(error));
              });
          })
          .catch((error) => {
            utils.app.log('end getCredentialFromGoogle', { error });

            reject(utils.app.createError(error));
          });
      })
      .catch((error) => {
        utils.app.log('end getCredentialFromGoogle', { error });

        reject(utils.app.createError(error));
      });
  });
}
