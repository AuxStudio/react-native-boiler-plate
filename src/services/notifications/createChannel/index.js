import firebase from 'react-native-firebase';

export default function createChannel() {
  return new Promise((resolve) => {
    const channel = new firebase.notifications.Android.Channel(
      'notifications',
      'Notifications',
      firebase.notifications.Android.Importance.Max,
    ).setDescription('Notifications channel');

    firebase.notifications().android.createChannel(channel);

    resolve();
  });
}
