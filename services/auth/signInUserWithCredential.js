import firebase from 'react-native-firebase';

export default function signInUserWithCredential(action) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Signing in user with credential: ${JSON.stringify(action.payload)}`);
    }

    firebase
      .auth()
      .signInAndRetrieveDataWithCredential(action.payload.credential)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
