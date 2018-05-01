import RNPermissions from 'react-native-permissions';

export default function requestPermission(permission) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Requesting permission ${JSON.stringify(permission)}`);
    }

    RNPermissions.request(permission)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
