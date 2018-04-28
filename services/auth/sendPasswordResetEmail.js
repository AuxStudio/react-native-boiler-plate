import firebase from 'react-native-firebase';

export default function sendPasswordResetEmail(action) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Sending password reset email: ${action.payload}`);
    }

    firebase
      .auth()
      .sendPasswordResetEmail(action.payload)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
