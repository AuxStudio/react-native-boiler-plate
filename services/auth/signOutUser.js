import firebase from 'react-native-firebase';

export default function signOutUser() {
  return new Promise((resolve) => {
    firebase
      .auth()
      .signOut()
      .then((user) => {
        resolve({
          payload: user,
        });
      })
      .catch((error) => {
        resolve({
          payload: error,
          error: true,
        });
      });
  });
}
