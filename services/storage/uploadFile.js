import firebase from 'react-native-firebase';

export default function uploadFile(ref, filePath) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Uploading file: ${ref}, ${filePath}`);
    }

    firebase
      .storage()
      .ref(ref)
      .putFile(filePath)
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
