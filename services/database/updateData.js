import firebase from 'react-native-firebase';

export default function updateData(action) {
  const ref = action.meta.node;

  if (__DEV__) {
    console.log(`Dispatching get at ${ref}`);
  }

  return new Promise((resolve) => {
    firebase
      .database()
      .ref(ref)
      .update(action.payload)
      .then(() => {
        resolve({
          payload: true,
        });
      })
      .catch((error) => {
        resolve({
          payload: new Error(error),
          error: true,
        });
      });
  });
}
