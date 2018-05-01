import Permissions from 'react-native-permissions';

export default function checkPermission(permission) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Checking permission: ${permission}`);
    }

    Permissions.check(permission)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
