import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function getCredentialFromEmail(email, password) {
  return new Promise((resolve) => {
    utils.log('start getCredentialFromEmail', { email, password });

    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    utils.log('end getCredentialFromEmail', { credential });

    resolve(credential);
  });
}
