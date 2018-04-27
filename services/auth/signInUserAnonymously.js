import firebase from 'react-native-firebase';

export default function signInUserAnonymously() {
  return new Promise((resolve) => {
    firebase
      .auth()
      .signInAnonymously()
      .then((user) => {
        resolve({
          payload: user,
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
