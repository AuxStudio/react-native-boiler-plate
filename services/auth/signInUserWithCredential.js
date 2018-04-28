import firebase from 'react-native-firebase';

export default function signInUserWithCredential(action) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithCredential(action.credential)
      .then((user) => {
        resolve({
          payload: user,
        });
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
