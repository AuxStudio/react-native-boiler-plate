import firebase from 'react-native-firebase';
import config from '../../config';
import utils from '../../utils';

export default function listenForData(relativeRef, successCallback, errorCallback) {
  return new Promise((resolve) => {
    const ref = `${config.environment}/${relativeRef}`;

    utils.log('start listenForData', { ref, successCallback, errorCallback });

    firebase
      .database()
      .ref(ref)
      .on(
        'value',
        (snapshot) => {
          const data = snapshot.val();

          utils.log('end listenForData', { data });

          resolve(successCallback(data));
        },
        (error) => {
          utils.log('end listenForData', { error });

          resolve(errorCallback(error));
        },
      );
  });
}
