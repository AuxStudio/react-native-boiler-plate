import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function signInWithCredential(credential) {
  return new Promise((resolve, reject) => {
    utils.log('start signInWithCredential', { credential });

    firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential)
      .then((user) => {
        const response = user; // response is already keyed by user
        utils.log('end signInWithCredential', response);

        resolve(response);
      })
      .catch((error) => {
        utils.log('end signInWithCredential', { error });

        reject(utils.createError(error));
      });
  });
}
