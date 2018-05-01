import firebase from 'react-native-firebase';

export default function signInUserWithCredential(credential) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Signing in user with credential: ${JSON.stringify(credential)}`);
    }

    firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
