import firebase from 'react-native-firebase';
import config from '../../config';
import utils from '../../utils';

export default function pushData(relativeRef) {
  return new Promise((resolve, reject) => {
    const ref = `${config.environment}/${relativeRef}`;

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
