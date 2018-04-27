import firebase from 'react-native-firebase';

export default function sendPasswordResetEmail(action) {
  return new Promise((resolve) => {
    firebase
      .auth()
      .sendPasswordResetEmail(action.userEmail)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        resolve({
          payload: new Error(error),
          error: true,
        });
      });
  });
}
