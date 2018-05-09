import firebase from 'react-native-firebase';
import config from '../../config';
import utils from '../../utils';

export default function updateData(relativeRef, data) {
  return new Promise((resolve, reject) => {
    const ref = `${config.environment}/${relativeRef}`;

    utils.log('start updateData', { ref, data });

    firebase
      .database()
      .ref(ref)
      .update(data)
      .then(() => {
        utils.log('end updateData');

        resolve();
      })
      .catch((error) => {
        utils.log('end updateData', { error });

        reject(utils.createError(error));
      });
  });
}
