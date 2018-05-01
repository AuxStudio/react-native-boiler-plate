import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function sendPasswordResetEmail(email) {
  return new Promise((resolve, reject) => {
    utils.log('start sendPasswordResetEmail', { email });

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        utils.log('end sendPasswordResetEmail');

        resolve();
      })
      .catch((error) => {
        utils.log('end sendPasswordResetEmail', { error });

        reject(utils.createError(error));
      });
  });
}
