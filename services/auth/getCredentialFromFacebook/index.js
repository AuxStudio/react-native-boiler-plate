import firebase from 'react-native-firebase';

import utils from '../../../utils';
import logOutFromFacebook from './logOutFromFacebook';
import logInToFacebook from './logInToFacebook';
import getCurrentAccessTokenFromFacebook from './getCurrentAccessTokenFromFacebook';
import getFacebookCredential from './getFacebookCredential';

export default function getCredentialFromFacebook() {
  return new Promise((resolve, reject) => {
    utils.app.log('start getCredentialFromFacebook');

    logOutFromFacebook()
      .then(
        logInToFacebook()
          .then((result) => {
            if (result.isCancelled) {
              utils.app.log('end getcredentialFromFacebook', 'User cancelled login');

              reject(utils.app.createError('User cancelled login'));
            } else {
              getCurrentAccessTokenFromFacebook()
                .then((user) => {
                  getFacebookCredential(user.accessToken)
                    .then((credential) => {
                      const response = credential && { credential };

                      utils.app.log('end getcredentialFromFacebook', response);

                      resolve(response);
                    })
                    .catch((error) => {
                      utils.app.log('end getcredentialFromFacebook', { error });

                      reject(utils.app.createError(error));
                    });
                })
                .catch((error) => {
                  utils.app.log('end getcredentialFromFacebook', { error });

                  reject(utils.app.createError(error));
                });
            }
          })
          .catch((error) => {
            utils.app.log('end getcredentialFromFacebook', { error });

            reject(utils.app.createError(error));
          }),
      )
      .catch((error) => {
        utils.app.log('end getcredentialFromFacebook', { error });

        reject(utils.app.createError(error));
      });
  });
}
