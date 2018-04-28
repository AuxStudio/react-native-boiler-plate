import firebase from 'react-native-firebase';

export default function signInUserAnonymously() {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log('Signing in anonymously');
    }

    firebase
      .auth()
      .signInAnonymously()
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
