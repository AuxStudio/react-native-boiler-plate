import { LoginManager } from 'react-native-fbsdk';

export default function logInToFacebook() {
  return new Promise((resolve, reject) => {
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      (result) => {
        resolve(result);
      },
      (error) => {
        reject(error);
      },
    );
  });
}
