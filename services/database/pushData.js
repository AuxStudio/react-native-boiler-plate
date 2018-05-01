import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function pushData(ref, data) {
  return new Promise((resolve, reject) => {
    utils.log('start pushData', { ref, data });

    firebase
      .database()
      .ref(ref)
      .push(data)
      .then(() => {
        utils.log('end pushData');

        resolve();
      })
      .catch((error) => {
        utils.log('end pushData', { error });

        reject(utils.createError(error));
      });
  });
}
