import firebase from 'react-native-firebase';

export default function uploadFile(action) {
  return new Promise((resolve, reject) => {
    const ref = action.meta.node;

    if (__DEV__) {
      console.log(`Uploading file to ${ref}`);
    }

    firebase
      .storage()
      .ref(ref)
      .putFile(action.meta.filePath)
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
          resolve({
            payload: uploadedFile.downloadURL,
          });
        },
      );
  });
}
