import firebase from 'react-native-firebase';

export default class Analytics {
  static logEvent(action) {
    // Only log events to analytics if in production
    if (__DEV__) {
      console.log(`Faux logging ${action.payload}`);
    } else {
      firebase.analytics().logEvent(action.payload, {});
    }
  }
}
