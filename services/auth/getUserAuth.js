import firebase from 'react-native-firebase';

export default function getUserAuth() {
  return new Promise((resolve) => {
    if (__DEV__) {
      console.log('Getting user authentication');
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(true);
      }
    });
  });
}
