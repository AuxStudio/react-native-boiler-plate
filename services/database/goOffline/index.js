import firebase from 'react-native-firebase';

import utils from '../../../utils';

export default function goOffline() {
  return new Promise((resolve) => {
    utils.app.log('start goOffline');

    firebase.database().goOffline();

    utils.app.log('end goOffline');
    resolve();
  });
}
