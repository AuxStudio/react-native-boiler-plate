import { GoogleSignIn } from 'react-native-google-signin';

import utils from '../../../../utils';

export default function signIn() {
  return new Promise((resolve, reject) => {
    utils.app.log('start signIn');

    GoogleSignIn.signIn()
      .then((user) => {
        utils.app.log('end signIn', { user });

        resolve(user);
      })
      .catch((error) => {
        utils.app.log('end signIn', { error });

        reject(error);
      });
  });
}
