import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function signOut() {
  return new Promise((resolve, reject) => {
    utils.log('start signOut');

    firebase
      .auth()
      .signOut()
      .then(() => {
        utils.log('end signOut');

        resolve();
      })
      .catch((error) => {
        utils.log('end signOut', { error });

        reject(utils.createError(error));
      });
  });
}
