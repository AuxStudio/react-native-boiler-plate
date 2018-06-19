import { GoogleSignIn } from 'react-native-google-signin';

export default function checkAndResolvePlayServices() {
  return new Promise((resolve, reject) => {
    GoogleSignIn.hasPlayServices({ autoResolve: true })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
