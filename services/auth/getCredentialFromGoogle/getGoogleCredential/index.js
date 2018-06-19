import firebase from 'react-native-firebase';

export default function getGoogleCredential(idToken, accessToken) {
  return new Promise((resolve, reject) => {
    if (idToken && accessToken) {
      const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
      resolve(credential);
    } else if (!idToken) {
      reject(new Error('ID token is required'));
    } else {
      reject(new Error('Access token is required'));
    }
  });
}
