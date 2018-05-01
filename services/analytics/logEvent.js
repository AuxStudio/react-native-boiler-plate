import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function logEvent(event, params) {
  return new Promise((resolve) => {
    utils.log('start logEvent', { event, params });

    if (!__DEV__) {
      // Only log events to analytics if in production
      firebase.analytics().log(event, params);
    }

    utils.log('end logEvent');
    resolve();
  });
}
