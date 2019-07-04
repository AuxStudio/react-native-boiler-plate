import firebase from 'react-native-firebase';

import utils from '../../../utils';

import checkAndResolvePlayServices from './checkAndResolvePlayServices';
import configureGoogleSign from './configureGoogleSignIn';
import signInToGoogle from './signInToGoogle';
import getGoogleCredential from './getGoogleCredential';

export default function getCredentialFromGoogle() {
  return new Promise((resolve, reject) => {
    checkAndResolvePlayServices()
      .then(() => {
        configureGoogleSign()
          .then(() => {
            signInToGoogle()
              .then((user) => {
                getGoogleCredential(user.idToken, user.accessToken)
                  .then((credential) => {
                    const response = credential && { credential };
                    resolve(response);
                  })
                  .catch((error) => {
                    reject(utils.app.createError(error));
                  });
              })
              .catch((error) => {
                reject(utils.app.createError(error));
              });
          })
          .catch((error) => {
            reject(utils.app.createError(error));
          });
      })
      .catch((error) => {
        reject(utils.app.createError(error));
      });
  });
}
