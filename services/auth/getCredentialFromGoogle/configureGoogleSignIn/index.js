import { GoogleSignIn } from 'react-native-google-signin';

import config from '../../../../config';

export default function configureGoogleSignIn() {
  return new Promise((resolve, reject) => {
    GoogleSignIn.configure({ ...config.googleSignIn })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
