import firebase from 'react-native-firebase';

export default function pushData(ref, data) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Dispatching push at ${ref}`);
    }

    firebase
      .database()
      .ref(ref)
      .push(data)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
