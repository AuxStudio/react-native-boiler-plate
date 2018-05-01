import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function uploadFile(ref, filePath) {
  return new Promise((resolve, reject) => {
    utils.log('start uploadFile', { ref, filePath });

    firebase
      .storage()
      .ref(ref)
      .putFile(filePath)
      .on(
        'state_changed',
        (snapshot) => {
          // snapshot
          // Current upload state
          // Ignore for now (need redux-saga's eventChannel)
          utils.log('progress uploadFile', { snapshot });
        },
        (error) => {
          utils.log('end uploadFile', { error });

          reject(utils.createError(error));
        },
        (uploadedFile) => {
          utils.log('end uploadFile', { uploadedFile });

          resolve(uploadedFile);
        },
      );
  });
}
