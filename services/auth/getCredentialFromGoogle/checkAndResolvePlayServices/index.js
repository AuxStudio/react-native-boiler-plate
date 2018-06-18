import { GoogleSignIn } from 'react-native-google-signin';

import utils from '../../../../utils';

export default function checkAndResolvePlayServices() {
  return new Promise((resolve, reject) => {
    utils.app.log('start checkAndResolvePlayServices');

    GoogleSignIn.hasPlayServices({ autoResolve: true })
      .then(() => {
        utils.app.log('end checkAndResolvePlayServices');

        resolve();
      })
      .catch((error) => {
        utils.app.log('end checkAndResolvePlayServices', { error });

        reject(error);
      });
  });
}
