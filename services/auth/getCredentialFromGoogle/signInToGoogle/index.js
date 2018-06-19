import { GoogleSignIn } from 'react-native-google-signin';

export default function signInToGoogle() {
  return new Promise((resolve, reject) => {
    GoogleSignIn.signIn()
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
