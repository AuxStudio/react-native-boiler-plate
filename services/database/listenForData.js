import firebase from 'react-native-firebase';

export default function listenForData(ref, callback) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Listening at ${ref}`);
    }

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
