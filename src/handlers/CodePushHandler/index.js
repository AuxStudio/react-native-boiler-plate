import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import codePush from 'react-native-code-push';
import { AppState } from 'react-native';

export class CodePushHandler extends React.Component {
  constructor(props) {
    super(props);

    this.syncCodePush = this.syncCodePush.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.setAppState = this.setAppState.bind(this);
    this.setCodePushStatus = this.setCodePushStatus.bind(this);
    this.setCodePushDownloadProgress = this.setCodePushDownloadProgress.bind(this);
    this.handleAppVersionMismatch = this.handleAppVersionMismatch.bind(this);

    this.state = {
      appState: null,
    };
  }

  static propTypes = {
    codePushStatus: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  componentDidMount() {
    // TODO: Report if update is available but we've automatically rolled back for whatever reason
    this.syncCodePush();

    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentDidUpdate(prevProps) {
    const { codePushStatus } = this.props;

    // If redux store was cleared
    if (
      !codePushStatus &&
      codePushStatus !== 0 &&
      (prevProps.codePushStatus || prevProps.codePushStatus === 0)
    ) {
      this.syncCodePush();
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  syncCodePush() {
    const syncOptions = {
      installMode: codePush.InstallMode.ON_NEXT_RESUME,
    };

    codePush.sync(
      syncOptions,
      this.setCodePushStatus,
      this.setCodePushDownloadProgress,
      this.handleAppVersionMismatch,
    );
  }

  handleAppStateChange(nextAppState) {
    const { appState } = this.state;

    // If the app is foregrounded after being backgrounded, sync codePush
    if (nextAppState === 'active' && appState && appState.match(/inactive|background/)) {
      this.syncCodePush();
    }

    this.setAppState(nextAppState);
  }

  setAppState(appState) {
    this.setState({
      appState,
    });
  }

  setCodePushStatus(codePushStatus) {
    const { dispatch } = this.props;

    dispatch({
      type: 'SET_CODE_PUSH_STATUS',
      payload: {
        codePushStatus,
      },
    });
  }

  setCodePushDownloadProgress(codePushDownloadProgress) {
    const { dispatch } = this.props;

    dispatch({
      type: 'SET_CODE_PUSH_DOWNLOAD_PROGRESS',
      payload: {
        codePushDownloadProgress,
      },
    });
  }

  handleAppVersionMismatch() {
    // TODO
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    codePushStatus: state.appState.codePushStatus,
  };
}

export default connect(mapStateToProps)(CodePushHandler);
