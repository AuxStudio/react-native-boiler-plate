import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function getAuth() {
  return new Promise((resolve) => {
    utils.log('start getAuth');

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        utils.log('end getAuth', { user });
        resolve(user);
      } else {
        utils.log('end getAuth');
        resolve(false);
      }
    });
  });
}
