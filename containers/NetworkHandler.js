import React from 'react';
import { NetInfo } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class NetworkHandler extends React.Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func,
    };
  }

  componentDidMount() {
    NetInfo.addEventListener('connectionChange', this.handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange = (connectionInfo) => {
    this.props.dispatch({
      type: 'SET_NETWORK_CONNECTION_INFO',
      payload: {
        network: connectionInfo,
      },
    });
  };

  render() {
    return null;
  }
}

export default connect()(NetworkHandler);
