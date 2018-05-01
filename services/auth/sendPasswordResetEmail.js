import firebase from 'react-native-firebase';

export default function sendPasswordResetEmail(email) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Sending password reset email: ${email}`);
    }

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
