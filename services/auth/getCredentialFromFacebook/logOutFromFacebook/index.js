import { LoginManager } from 'react-native-fbsdk';

export default function logOutFromFacebook() {
  return new Promise((resolve) => {
    LoginManager.logOut();

    resolve();
  });
}
