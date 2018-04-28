import firebase from 'react-native-firebase';

export default function logEvent(action) {
  return new Promise((resolve) => {
    // Only log events to analytics if in production
    if (__DEV__) {
      console.log(`Logging analytics: ${action.payload}`);
    } else {
      firebase.analytics().logEvent(action.payload.event, {});
    }
    resolve(true);
  });
}
