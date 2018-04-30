import firebase from 'react-native-firebase';

export default function updateData(action) {
  return new Promise((resolve, reject) => {
    const ref = action.payload.node;

    if (__DEV__) {
      console.log(`Dispatching update at ${ref}`);
    }

    firebase
      .database()
      .ref(ref)
      .update(action.payload.data)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
