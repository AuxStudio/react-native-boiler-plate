import firebase from 'firebase';

export default function getUserCredentialFromEmail(action) {
  return new Promise((resolve) => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      action.payload.email,
      action.payload.password,
    );

    resolve({
      payload: credential,
    });
  });
}
