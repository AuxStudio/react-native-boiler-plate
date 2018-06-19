import firebase from 'react-native-firebase';

export default function getFacebookCredential(accessToken) {
  return new Promise((resolve, reject) => {
    if (accessToken) {
      const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);
      resolve(credential);
    } else {
      reject(new Error('Access token is required'));
    }
  });
}
