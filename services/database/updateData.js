import firebase from 'react-native-firebase';

export default function updateData(ref, data) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Dispatching update at ${ref}`);
    }

    firebase
      .database()
      .ref(ref)
      .update(data)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
