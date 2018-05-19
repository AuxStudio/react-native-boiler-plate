import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function uploadFile(ref, uri) {
  return new Promise((resolve, reject) => {
    utils.log('start uploadFile', { ref, uri });

    firebase
      .storage()
      .ref(ref)
      .putFile(uri)
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
          const response = uploadedFile && { uploadedFile };
          utils.log('end uploadFile', response);
          resolve(response);
        },
      );
  });
}
