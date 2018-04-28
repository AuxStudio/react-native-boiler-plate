import firebase from 'react-native-firebase';

export default function listenForData(ref, callback) {
  if (__DEV__) {
    console.log(`Listening at ${ref}`);
  }

  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(ref)
      .on(
        'value',
        (snapshot) => {
          resolve(callback(snapshot.val()));
        },
        (error) => {
          reject(new Error(error));
        },
      );
  });
}
