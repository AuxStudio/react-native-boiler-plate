import { AccessToken } from 'react-native-fbsdk';

export default function getCurrentAccessToken() {
  return new Promise((resolve, reject) => {
    AccessToken.getCurrentAccessToken()
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
