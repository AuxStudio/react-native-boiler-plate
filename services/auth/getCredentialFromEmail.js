import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function getCredentialFromEmail(email, password) {
  return new Promise((resolve) => {
    utils.log('start getCredentialFromEmail', { email, password });

    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    const response = credential && { credential };

    utils.log('end getCredentialFromEmail', response);

    resolve(response);
  });
}
