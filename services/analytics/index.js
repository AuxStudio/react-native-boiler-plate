import firebase from 'react-native-firebase';

export default class Analytics {
  static logEvent(event) {
    // Only log events to analytics if in production
    if (__DEV__) {
      console.log(`Faux logging ${event}`);
    } else {
      firebase.analytics().logEvent(event, {});
    }
  }
}
