import RNPermissions from 'react-native-permissions';

export default function checkPermission(action) {
  return new Promise((resolve) => {
    RNPermissions.check(action.meta.permission)
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
