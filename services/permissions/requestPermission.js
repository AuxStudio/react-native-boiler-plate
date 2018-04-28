import RNPermissions from 'react-native-permissions';

export default function checkPermission(action) {
  return new Promise((resolve) => {
    RNPermissions.request(action.meta.permission)
      .then((response) => {
        resolve({
          payload: response,
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
