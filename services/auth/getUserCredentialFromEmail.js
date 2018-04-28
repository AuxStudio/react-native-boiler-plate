import firebase from 'firebase';

export default function getUserCredentialFromEmail(action) {
  return new Promise((resolve) => {
    if (__DEV__) {
      console.log(`Getting user credential from email: ${action.payload}`);
    }

    const credential = firebase.auth.EmailAuthProvider.credential(
      action.payload.email,
      action.payload.password,
    );

    resolve(credential);
  });
}
