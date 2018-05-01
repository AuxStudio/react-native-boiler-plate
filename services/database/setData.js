import firebase from 'react-native-firebase';

export default function setData(ref, data) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Dispatching set at ${ref}`);
    }

    firebase
      .database()
      .ref(ref)
      .set(data)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
