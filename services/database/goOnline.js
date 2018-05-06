import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function goOnline() {
  return new Promise((resolve) => {
    utils.log('start goOnline');

    firebase.database().goOnline();

    utils.log('end goOnline');
    resolve();
  });
}
