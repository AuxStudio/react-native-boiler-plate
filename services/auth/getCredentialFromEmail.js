import firebase from 'react-native-firebase';

export default function getCredentialFromEmail(email, password) {
  return new Promise((resolve) => {
    if (__DEV__) {
      console.log(`Getting user credential from email: ${email}, ${password}`);
    }

    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    resolve(credential);
  });
}
