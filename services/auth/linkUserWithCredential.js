import firebase from 'react-native-firebase';

export default function linkUserWithCredential(action) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .currentUser.linkWithCredential(action.credential)
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
