import firebase from 'react-native-firebase';

export default function signInUserWithCredential(action) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Signing in user with credential: ${action.payload}`);
    }

    firebase
      .auth()
      .signInWithCredential(action.payload)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
