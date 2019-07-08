import firebase from 'react-native-firebase';

export default function listenForData(ref, successCallback, errorCallback) {
  return new Promise((resolve) => {
    firebase
      .database()
      .ref(ref)
      .on(
        'value',
        (snapshot) => {
          const data = snapshot.val();
          resolve(successCallback(data));
        },
        (error) => {
          resolve(errorCallback(error));
        },
      );
  });
}
