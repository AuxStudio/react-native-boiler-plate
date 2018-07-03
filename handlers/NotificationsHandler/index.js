import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

export class NotificationsHandler extends React.Component {
  constructor(props) {
    super(props);

    this.requestNotificationsPermission = this.requestNotificationsPermission.bind(this);
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func,
    };
  }

  componentDidMount() {
    this.requestNotificationsPermission();

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed(() => {
      // returns notification
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });
    this.notificationListener = firebase.notifications().onNotification(() => {
      // returns notification
      // Process your notification as required
    });
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened(() => {
      // returns notificationOpen
      // Get the action triggered by the notification being opened
      // const action = notificationOpen.action;
      // Get information about the notification that was opened
      // const notification = notificationOpen.notification;
    });
  }

  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }

  requestNotificationsPermission() {
    const { dispatch } = this.props;

    dispatch({
      type: 'requestNotificationsPermission',
      meta: {
        nextAction: {
          type: 'createChannel', // needed for android 8
        },
      },
    });
  }

  render() {
    return null;
  }
}

export default connect()(NotificationsHandler);
