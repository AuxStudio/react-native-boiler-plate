import firebase from 'react-native-firebase';

import utils from '../../../utils';

export default function setData(ref, data) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(ref)
      .set(data)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(utils.app.createError(error));
      });
  });
}
