import firebase from 'react-native-firebase';
import config from '../../config';
import utils from '../../utils';

export default function setData(relativeRef) {
  return new Promise((resolve, reject) => {
    const ref = `${config.environment}/${relativeRef}`;

    utils.log('start setData', { ref, data });

    firebase
      .database()
      .ref(ref)
      .set(data)
      .then(() => {
        utils.log('end setData');

        resolve();
      })
      .catch((error) => {
        utils.log('end setData', { error });

        reject(utils.createError(error));
      });
  });
}
