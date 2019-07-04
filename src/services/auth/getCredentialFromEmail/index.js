import firebase from 'react-native-firebase';

export default function getCredentialFromEmail(email, password) {
  return new Promise((resolve) => {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    const response = credential && { credential };
    resolve(response);
  });
}
