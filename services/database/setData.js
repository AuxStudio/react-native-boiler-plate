import firebase from 'react-native-firebase';

export default function setData(action) {
  return new Promise((resolve, reject) => {
    const ref = action.payload.node;

    if (__DEV__) {
      console.log(`Dispatching set at ${ref}`);
    }

    firebase
      .database()
      .ref(ref)
      .set(action.payload.data)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
