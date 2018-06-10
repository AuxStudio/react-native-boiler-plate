import firebase from 'react-native-firebase';

import utils from '../../../utils';

export default function uploadFile(ref, uri) {
  return new Promise((resolve, reject) => {
    utils.app.log('start uploadFile', { ref, uri });

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
          utils.app.log('progress uploadFile', { snapshot });
        },
        (error) => {
          utils.app.log('end uploadFile', { error });
          reject(utils.app.createError(error));
        },
        (uploadedFile) => {
          const response = uploadedFile && { uploadedFile };
          utils.app.log('end uploadFile', response);
          resolve(response);
        },
      );
  });
}
