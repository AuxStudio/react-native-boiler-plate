import { GoogleSignIn } from 'react-native-google-signin';

import { googleSignIn } from '../../../../config';

export default function configureGoogleSignIn() {
  return new Promise((resolve, reject) => {
    GoogleSignIn.configure({ ...googleSignIn })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
