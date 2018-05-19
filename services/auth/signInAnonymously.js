import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function signInAnonymously() {
  return new Promise((resolve, reject) => {
    utils.log('start signInAnonymously');

    firebase
      .auth()
      .signInAnonymouslyAndRetrieveData()
      .then((user) => {
        const response = user && { user };
        utils.log('end signInAnonymously', response);

        resolve(response);
      })
      .catch((error) => {
        utils.log('end signInAnonymously', { error });

        reject(utils.createError(error));
      });
  });
}
