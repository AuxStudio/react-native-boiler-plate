import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function listenForData(ref, successCallback, errorCallback) {
  return new Promise((resolve) => {
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
