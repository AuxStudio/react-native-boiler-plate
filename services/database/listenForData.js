import firebase from 'react-native-firebase';

export default function listenForData(ref, callback) {
  if (__DEV__) {
    console.log(`Listening at ${ref}`);
  }

  return new Promise((resolve) => {
    firebase
      .database()
      .ref(ref)
      .on(
        'value',
        (snapshot) => {
          resolve(callback(snapshot.val()));
        },
        (error) => {
          resolve({
            payload: error,
            error: true,
          });
        },
      );
  });
}
