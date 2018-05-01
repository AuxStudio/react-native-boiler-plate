import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function listenForData(ref, callback) {
  return new Promise((resolve, reject) => {
    utils.log('start listenForData', { ref, callback });

    firebase
      .database()
      .ref(ref)
      .on(
        'value',
        (snapshot) => {
          const data = snapshot.val();

          utils.log('end listenForData', { data });

          resolve(callback(data));
        },
        (error) => {
          utils.log('end listenForData', { error });

          reject(utils.createError(error));
        },
      );
  });
}
