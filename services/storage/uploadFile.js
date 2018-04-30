import firebase from 'react-native-firebase';

export default function uploadFile(action) {
  return new Promise((resolve, reject) => {
    const ref = action.payload.node;

    if (__DEV__) {
      console.log(`Uploading file: ${ref}, ${JSON.stringify(action.payload)}`);
    }

    firebase
      .storage()
      .ref(ref)
      .putFile(action.payload.filePath)
      .on(
        'state_changed',
        () => {
          // snapshot
          // Current upload state
          // Ignore for now (need redux-saga's eventChannel)
        },
        (error) => {
          reject(new Error(error));
        },
        (uploadedFile) => {
          resolve(uploadedFile);
        },
      );
  });
}
