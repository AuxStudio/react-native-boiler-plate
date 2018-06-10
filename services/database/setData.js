import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function setData(ref, data) {
  return new Promise((resolve, reject) => {
    utils.app.log('start setData', { ref, data });

    firebase
      .database()
      .ref(ref)
      .set(data)
      .then(() => {
        utils.app.log('end setData');

        resolve();
      })
      .catch((error) => {
        utils.app.log('end setData', { error });

        reject(utils.app.createError(error));
      });
  });
}
