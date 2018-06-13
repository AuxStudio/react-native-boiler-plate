import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from 'react-native-snackbar';

import Error from '../../scenes/Error';

export class SystemMessageHandler extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    children: PropTypes.node.isRequired,
    systemMessage: PropTypes.shape({
      message: PropTypes.string,
      code: PropTypes.string,
      error: PropTypes.bool,
    }),
    uid: PropTypes.string,
  };

  static defaultProps = {};

  state = {
    hasError: null,
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.systemMessage.message &&
      this.props.systemMessage.message !== prevProps.systemMessage.message
    ) {
      if (this.props.systemMessage.error) {
        this.logErrorToDatabase();
      }

      this.showSnackbar();
    }
  }

  componentDidCatch(error) {
    // Catch errors in children
    this.setState({ hasError: true });

    this.logErrorToDatabase(error);
  }

  SNACKBAR_DURATION = 2750;

  showSnackbar = () => {
    Snackbar.show({
      title: this.props.systemMessage.message,
      duration: this.SNACKBAR_DURATION,
    });

    setTimeout(() => {
      this.resetError();
    }, this.SNACKBAR_DURATION); // Snackbar.LENGTH_LONG does not work here so we need to manually add the duration
  };

  resetError = () => {
    this.props.dispatch({
      type: 'RESET_SYSTEM_MESSAGE',
    });
  };

  logErrorToDatabase = () => {
    // Log error to database if not in development mode
    if (!__DEV__) {
      this.props.dispatch({
        type: 'logError',
        payload: {
          data: {
            message: this.props.systemMessage.message,
            code: this.props.systemMessage.code,
            date: Date.now(),
            uid: this.props.uid,
          },
        },
      });
    }
  };

  render() {
    if (this.state.hasError) {
      return <Error />;
    }

    return this.props.children;
  }
}

function mapStateToProps(state) {
  return {
    systemMessage: state.appState.systemMessage,
    uid: state.user.uid,
  };
}

export default connect(mapStateToProps)(SystemMessageHandler);
