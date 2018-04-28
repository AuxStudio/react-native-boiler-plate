import firebase from 'react-native-firebase';

export default function signInUserAnonymously() {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInAnonymously()
      .then((user) => {
        resolve({
          payload: user,
        });
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
