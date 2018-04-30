import RNPermissions from 'react-native-permissions';

export default function requestPermission(action) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Requesting permission ${JSON.stringify(action.payload)}`);
    }

    RNPermissions.request(action.payload.permission)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
