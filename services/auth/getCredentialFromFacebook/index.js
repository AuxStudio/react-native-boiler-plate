import firebase from 'react-native-firebase';

import utils from '../../../utils';
import logOut from './logOut';
import logIn from './logIn';
import getCurrentAccessToken from './getCurrentAccessToken';
import getFacebookCredential from './getFacebookCredential';

export default function getCredentialFromFacebook() {
  return new Promise((resolve, reject) => {
    utils.app.log('start getCredentialFromFacebook');

    logOut()
      .then(
        logIn()
          .then((result) => {
            if (result.isCancelled) {
              utils.app.log('end getcredentialFromFacebook', 'User cancelled login');

              reject(utils.app.createError('User cancelled login'));
            } else {
              getCurrentAccessToken()
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
