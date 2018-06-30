import React from 'react';
import { NetInfo } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class NetworkHandler extends React.Component {
  constructor(props) {
    super(props);

    this.addNetInfoEventListener = this.addNetInfoEventListener.bind(this);
    this.removeNetInfoEventListener = this.removeNetInfoEventListener.bind(this);
    this.handleConnectionChange = this.handleConnectionChange.bind(this);
    this.goOffline = this.goOffline.bind(this);
    this.goOnline = this.goOnline.bind(this);
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func,
      realtimeDatabaseMode: PropTypes.bool,
    };
  }

  componentDidMount() {
    this.addNetInfoEventListener();
  }

  componentWillUnmount() {
    this.removeNetInfoEventListener();
  }

  addNetInfoEventListener() {
    NetInfo.addEventListener('connectionChange', this.handleConnectionChange);
  }

  removeNetInfoEventListener() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange(connectionInfo) {
    const { dispatch, realtimeDatabaseMode } = this.props;

    dispatch({
      type: 'SET_NETWORK_CONNECTION_INFO',
      payload: {
        network: connectionInfo,
      },
    });

    if (
      realtimeDatabaseMode &&
      (connectionInfo.type === 'none' ||
        (connectionInfo.type === 'cellular' && connectionInfo.effectiveType === '2g'))
    ) {
      this.goOffline();
    } else if (
      !realtimeDatabaseMode &&
      (connectionInfo.type !== 'none' && connectionInfo.effectiveType !== '2g')
    ) {
      this.goOnline();
    }
  }

  goOffline() {
    const { dispatch } = this.props;

    dispatch({
      type: 'goOffline',
      meta: {
        nextAction: {
          type: 'TOGGLE_REALTIME_DATABASE_MODE',
        },
      },
    });
  }

  goOnline() {
    const { dispatch } = this.props;

    dispatch({
      type: 'goOnline',
      meta: {
        nextAction: {
          type: 'TOGGLE_REALTIME_DATABASE_MODE',
        },
      },
    });
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    realtimeDatabaseMode: state.appState.realtimeDatabaseMode,
  };
}

export default connect(mapStateToProps)(NetworkHandler);
