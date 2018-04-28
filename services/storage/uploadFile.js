import firebase from 'react-native-firebase';

export default function uploadFile(action) {
  const ref = action.meta.node;

  if (__DEV__) {
    console.log(`Uploading file to ${ref}`);
  }

  return new Promise((resolve) => {
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
          resolve({
            payload: new Error(error),
            error: true,
          });
        },
        (uploadedFile) => {
          resolve({
            payload: uploadedFile.downloadURL,
          });
        },
      );
  });
}
