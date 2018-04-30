import firebase from 'react-native-firebase';

export default function pushData(action) {
  return new Promise((resolve, reject) => {
    const ref = action.payload.node;

    if (__DEV__) {
      console.log(`Dispatching push at ${ref}`);
    }

    firebase
      .database()
      .ref(ref)
      .push(action.payload.data)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
