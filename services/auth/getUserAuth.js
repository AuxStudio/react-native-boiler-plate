import firebase from 'react-native-firebase';

export default function getUserAuth() {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve({
          payload: user,
        });
      } else {
        resolve({
          payload: null,
        });
      }
    });
  });
}
