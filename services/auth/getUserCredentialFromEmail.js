import firebase from 'react-native-firebase';

export default function getUserCredentialFromEmail(action) {
  return new Promise((resolve) => {
    if (__DEV__) {
      console.log(
        `Getting user credential from email: ${action.payload.email}, password: ${
          action.payload.password
        }}`,
      );
    }

    const credential = firebase.auth.EmailAuthProvider.credential(
      action.payload.email,
      action.payload.password,
    );

    resolve(credential);
  });
}
