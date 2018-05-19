import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from 'react-native-snackbar';

export class SnackbarHandler extends React.Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func,
      systemMessage: PropTypes.shape({
        message: PropTypes.string,
        // code: PropTypes.string,
        // error: PropTypes.bool,
      }),
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.systemMessage.message &&
      this.props.systemMessage.message !== prevProps.systemMessage.message
    ) {
      this.showSnackbar();
    }
  }

  duration = 2750;

  showSnackbar = () => {
    Snackbar.show({
      title: this.props.systemMessage.message,
      duration: this.duration,
    });

    setTimeout(() => {
      this.resetError();
    }, this.duration); // Snackbar.LENGTH_LONG does not work here so we need to manually add the duration
  };

  resetError = () => {
    this.props.dispatch({
      type: 'RESET_SYSTEM_MESSAGE',
    });
  };

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    systemMessage: state.appState.systemMessage,
  };
}

export default connect(mapStateToProps)(SnackbarHandler);
