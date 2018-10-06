import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import codePush from 'react-native-code-push';

import CodePushStatus from './CodePushStatus';

export class CodePushStatusContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {
    codePushStatus: PropTypes.number,
    codePushDownloadProgress: PropTypes.shape({
      receivedBytes: PropTypes.number,
      totalBytes: PropTypes.number,
    }),
  };

  static defaultProps = {};

  render() {
    const { codePushStatus, codePushDownloadProgress } = this.props;
    let iconName;
    let statusText;
    let isLoading;

    switch (codePushStatus) {
      case codePush.SyncStatus.UP_TO_DATE:
        statusText = 'The app is up to date';
        iconName = 'check';
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        statusText = 'Update ready. Close and reopen the app, to apply.';
        iconName = 'warning';
        break;
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        statusText = 'Checking for app updates';
        isLoading = true;
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        statusText = `Downloading update: ${
          codePushDownloadProgress
            ? Number(
                (codePushDownloadProgress.receivedBytes / codePushDownloadProgress.totalBytes) *
                  100,
              ).toFixed(0) // FIXME: Should be a util
            : 0
        }%`;
        isLoading = true;
        break;
      default:
        break;
    }

    return statusText ? (
      <CodePushStatus iconName={iconName} text={statusText} isLoading={isLoading} />
    ) : null;
  }
}

function mapStateToProps(state) {
  return {
    codePushStatus: state.appState.codePushStatus,
    codePushDownloadProgress: state.appState.codePushDownloadProgress,
  };
}

export default connect(mapStateToProps)(CodePushStatusContainer);
