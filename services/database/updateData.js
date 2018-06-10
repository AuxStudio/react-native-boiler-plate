import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function updateData(ref, data) {
  return new Promise((resolve, reject) => {
    utils.app.log('start updateData', { ref, data });

    firebase
      .database()
      .ref(ref)
      .update(data)
      .then(() => {
        utils.app.log('end updateData');

        resolve();
      })
      .catch((error) => {
        utils.app.log('end updateData', { error });

        reject(utils.app.createError(error));
      });
  });
}
