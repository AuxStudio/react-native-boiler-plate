import firebase from 'react-native-firebase';

export default function getAuth() {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      const response = user && { user };
      resolve(response);
    });
  });
}
