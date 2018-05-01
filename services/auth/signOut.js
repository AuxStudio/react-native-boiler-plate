import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function signOut() {
  return new Promise((resolve, reject) => {
    utils.log('start signOut');

    firebase
      .auth()
      .signOut()
      .then((user) => {
        utils.log('end signOut', { user });

        resolve(user);
      })
      .catch((error) => {
        utils.log('end signOut', { error });

        reject(utils.createError(error));
      });
  });
}
