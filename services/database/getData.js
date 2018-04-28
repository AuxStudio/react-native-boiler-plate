import firebase from 'react-native-firebase';

export default function getData(action) {
  return new Promise((resolve, reject) => {
    const ref = action.payload.node;

    if (__DEV__) {
      console.log(`Dispatching get at ${ref}`);
    }

    firebase
      .database()
      .ref(ref)
      .once('value')
      .then((snapshot) => {
        resolve(snapshot.val());
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
