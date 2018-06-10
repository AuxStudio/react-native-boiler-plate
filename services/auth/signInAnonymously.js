import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function signInAnonymously() {
  return new Promise((resolve, reject) => {
    utils.app.log('start signInAnonymously');

    firebase
      .auth()
      .signInAnonymouslyAndRetrieveData()
      .then((user) => {
        const response = user && { user };
        utils.app.log('end signInAnonymously', response);

        resolve(response);
      })
      .catch((error) => {
        utils.app.log('end signInAnonymously', { error });

        reject(utils.app.createError(error));
      });
  });
}
