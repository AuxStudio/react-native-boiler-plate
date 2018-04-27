import firebase from 'react-native-firebase';

export default function linkUserWithCredential(action) {
  return new Promise((resolve) => {
    firebase
      .auth()
      .currentUser.linkWithCredential(action.credential)
      .then((user) => {
        resolve({
          payload: user,
        });
      })
      .catch((error) => {
        resolve({
          payload: new Error(error),
          error: true,
        });
      });
  });
}
