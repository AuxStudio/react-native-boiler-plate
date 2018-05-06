import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function goOffline() {
  return new Promise((resolve) => {
    utils.log('start goOffline');

    firebase.database().goOffline();

    utils.log('end goOffline');
    resolve();
  });
}
