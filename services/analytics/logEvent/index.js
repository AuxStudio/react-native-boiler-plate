import firebase from 'react-native-firebase';

export default function logEvent(event, params) {
  return new Promise((resolve) => {
    firebase.analytics().log(event, params);
    resolve();
  });
}
