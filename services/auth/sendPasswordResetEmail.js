import firebase from 'react-native-firebase';

export default function sendPasswordResetEmail(action) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .sendPasswordResetEmail(action.userEmail)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
