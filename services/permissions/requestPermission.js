import RNPermissions from 'react-native-permissions';

export default function checkPermission(action) {
  return new Promise((resolve, reject) => {
    RNPermissions.request(action.meta.permission)
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
