import firebase from 'react-native-firebase';

export default function getData(action) {
  const ref = action.meta.node;

  if (__DEV__) {
    console.log(`Dispatching get at ${ref}`);
  }

  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(ref)
      .once('value')
      .then((snapshot) => {
        resolve({
          payload: snapshot.val(),
        });
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
