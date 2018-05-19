import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function getAuth() {
  return new Promise((resolve) => {
    utils.log('start getAuth');

    firebase.auth().onAuthStateChanged((user) => {
      const response = user && { user };
      utils.log('end getAuth', response);
      resolve(response);
    });
  });
}
