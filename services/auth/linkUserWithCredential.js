import firebase from 'react-native-firebase';

export default function linkUserWithCredential(action) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Link user with credential: ${action.payload}`);
    }

    firebase
      .auth()
      .currentUser.linkAndRetrieveDataWithCredential(action.payload)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
