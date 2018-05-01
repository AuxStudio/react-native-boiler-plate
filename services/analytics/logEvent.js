import firebase from 'react-native-firebase';

export default function logEvent(event, params) {
  return new Promise((resolve) => {
    // Only log events to analytics if in production
    if (__DEV__) {
      console.log(`Logging analytics: ${event}, ${JSON.stringify(params)}`);
    } else {
      firebase.analytics().logEvent(event, params);
    }
    resolve(true);
  });
}
