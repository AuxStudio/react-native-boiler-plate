import firebase from 'react-native-firebase';

import utils from '../../../utils';

export default function listenForData(ref, successCallback, errorCallback) {
  return new Promise((resolve) => {
    utils.app.log('start listenForData', { ref, successCallback, errorCallback });

    firebase
      .database()
      .ref(ref)
      .on(
        'value',
        (snapshot) => {
          const data = snapshot.val();

          utils.app.log('end listenForData', { data });

          resolve(successCallback(data));
        },
        (error) => {
          utils.app.log('end listenForData', { error });

          resolve(errorCallback(error));
        },
      );
  });
}
