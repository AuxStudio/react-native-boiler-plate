import firebase from 'react-native-firebase';

export default function signOut() {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log('Signing user out');
    }

    firebase
      .auth()
      .signOut()
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
