import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class LocationHandler extends React.Component {
  constructor(props) {
    super(props);

    this.getLocationPermission = this.getLocationPermission.bind(this);
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func,
    };
  }

  componentDidMount() {
    this.getLocationPermission();
  }

  getLocationPermission() {
    const { dispatch } = this.props;

    dispatch({
      type: 'checkAndRequestPermission',
      payload: {
        permission: 'location',
      },
      meta: {
        nextAction: {
          type: 'getDeviceLocation',
        },
      },
    });
  }

  render() {
    return null;
  }
}

export default connect()(LocationHandler);
