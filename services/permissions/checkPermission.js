import RNPermissions from 'react-native-permissions';

export default function checkPermission(action) {
  return new Promise((resolve, reject) => {
    RNPermissions.check(action.meta.permission)
      .then((response) => {
        resolve({
          payload: response,
        });
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
