import firebase from 'react-native-firebase';

export default function signOutUser() {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
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
