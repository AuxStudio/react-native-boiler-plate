import firebase from 'react-native-firebase';

import utils from '../../../utils';

import checkAndResolvePlayServices from './checkAndResolvePlayServices';
import configureGoogleSign from './configureGoogleSignIn';
import signIn from './signIn';
import getGoogleCredential from './getGoogleCredential';

export default function getCredentialFromGoogle() {
  return new Promise((resolve, reject) => {
    utils.app.log('start getCredentialFromGoogle');

    checkAndResolvePlayServices()
      .then(() => {
        configureGoogleSign()
          .then(() => {
            signIn()
              .then((user) => {
                getGoogleCredential(user.idToken, user.accessToken)
                  .then((credential) => {
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
      })
      .catch((error) => {
        utils.app.log('end getCredentialFromGoogle', { error });

        reject(utils.app.createError(error));
      });
  });
}
