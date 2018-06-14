import firebase from 'react-native-firebase';

import utils from '../../../utils';

export default function goOnline() {
  return new Promise((resolve) => {
    utils.app.log('start goOnline');

    firebase.database().goOnline();

    utils.app.log('end goOnline');
    resolve();
  });
}
