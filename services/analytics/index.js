import firebase from 'react-native-firebase';

export default function logEvent(action) {
  // Only log events to analytics if in production
  if (__DEV__) {
    console.log(`Logging ${action.payload} to Analytics`);
  } else {
    firebase.analytics().logEvent(action.payload, {});
  }
}
