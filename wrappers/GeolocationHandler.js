import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Permissions from '../permissions';

export class GeolocationHandler extends React.Component {
  constructor(props) {
    super(props);

    this.getLocationPermission = this.getLocationPermission.bind(this);
    this.getDeviceLocation = this.getDeviceLocation.bind(this);
  }

  static get propTypes() {
    return {
      userLocation: PropTypes.object,
    };
  }

  componentDidMount() {
    if (!this.props.userLocation) {
      this.getLocationPermission();
    }
  }

  getLocationPermission() {
    Permissions.handlePermission('location', this.getDeviceLocation(), () => {
      this.props.dispatch({
        type: 'SET_MESSAGE',
        errorType: 'PERMISSIONS',
        message: 'We need your permission to get your location',
        iconName: 'error-outline',
      });
    });
  }

  getDeviceLocation() {
    this.props.dispatch({
      type: 'getDeviceLocation',
    });
  }

  render() {
    return this.props.children;
  }
}

function mapStateToProps(state) {
  return {
    userLocation: state.main.appState.userLocation,
  };
}

export default connect(mapStateToProps)(GeolocationHandler);
