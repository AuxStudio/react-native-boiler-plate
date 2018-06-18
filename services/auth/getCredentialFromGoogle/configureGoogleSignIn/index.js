import { GoogleSignIn } from 'react-native-google-signin';

import config from '../../../../config';
import utils from '../../../../utils';

export default function configureGoogleSignIn() {
  return new Promise((resolve, reject) => {
    utils.app.log('start configureGoogleSignIn');

    GoogleSignIn.configure({ ...config.googleSignIn })
      .then(() => {
        utils.app.log('end configureGoogleSignIn');

        resolve();
      })
      .catch((error) => {
        utils.app.log('end configureGoogleSignIn', { error });

        reject(error);
      });
  });
}
