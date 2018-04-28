import RNPermissions from 'react-native-permissions';

export default function checkPermission(action) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Checking permission: ${action.payload}`);
    }

    RNPermissions.check(action.payload.permission)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
