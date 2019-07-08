import firebase from 'react-native-firebase';

export default function goOffline() {
  return new Promise((resolve) => {
    firebase.database().goOffline();
    resolve();
  });
}
