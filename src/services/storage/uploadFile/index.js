import firebase from 'react-native-firebase';

import { app } from '../../../utils';

export default function uploadFile(ref, uri) {
  return new Promise((resolve, reject) => {
    firebase
      .storage()
      .ref(ref)
      .putFile(uri)
      .on(
        'state_changed',
        () => {
          // returns snapshot
          // Current upload state
          // Ignore for now (need redux-saga's eventChannel)
        },
        (error) => {
          reject(app.createError(error));
        },
        (uploadedFile) => {
          const response = uploadedFile && { uploadedFile };

          resolve(response);
        },
      );
  });
}
