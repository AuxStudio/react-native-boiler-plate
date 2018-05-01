import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function setData(ref, data) {
  return new Promise((resolve, reject) => {
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
