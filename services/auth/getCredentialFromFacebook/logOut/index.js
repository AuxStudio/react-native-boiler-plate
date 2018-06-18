import { LoginManager } from 'react-native-fbsdk';

export default function logOut() {
  return new Promise((resolve) => {
    LoginManager.logOut();

    resolve();
  });
}
