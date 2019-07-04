import firebase from 'react-native-firebase';

export default function goOnline() {
  return new Promise((resolve) => {
    firebase.database().goOnline();
    resolve();
  });
}
