import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function signInWithCredential(credential) {
  return new Promise((resolve, reject) => {
    utils.log('start signInWithCredential', { credential });

    firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential)
      .then((user) => {
        utils.log('end signInWithCredential', { user });

        resolve(user);
      })
      .catch((error) => {
        utils.log('end signInWithCredential', { error });

        reject(utils.createError(error));
      });
  });
}
