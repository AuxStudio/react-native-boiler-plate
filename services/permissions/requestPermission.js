import Permissions from 'react-native-permissions';

export default function requestPermission(permission) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Requesting permission ${permission}`);
    }

    Permissions.request(permission)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
