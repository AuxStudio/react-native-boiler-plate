import firebase from 'react-native-firebase';

import utils from '../../../utils';
import logOutFromFacebook from './logOutFromFacebook';
import logInToFacebook from './logInToFacebook';
import getCurrentAccessTokenFromFacebook from './getCurrentAccessTokenFromFacebook';
import getFacebookCredential from './getFacebookCredential';

export default function getCredentialFromFacebook() {
  return new Promise((resolve, reject) => {
    logOutFromFacebook()
      .then(
        logInToFacebook()
          .then((result) => {
            if (result.isCancelled) {
              reject(utils.app.createError('User cancelled login'));
            } else {
              getCurrentAccessTokenFromFacebook()
                .then((user) => {
                  getFacebookCredential(user.accessToken)
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
            }
          })
          .catch((error) => {
            reject(utils.app.createError(error));
          }),
      )
      .catch((error) => {
        reject(utils.app.createError(error));
      });
  });
}
