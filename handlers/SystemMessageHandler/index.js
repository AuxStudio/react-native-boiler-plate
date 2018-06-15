import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from 'react-native-snackbar';

export class SystemMessageHandler extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    children: PropTypes.node.isRequired,
    systemMessage: PropTypes.shape({
      message: PropTypes.string,
      code: PropTypes.string,
      error: PropTypes.bool,
    }),
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    if (
      this.props.systemMessage.message &&
      this.props.systemMessage.message !== prevProps.systemMessage.message
    ) {
      this.showSnackbar();
    }
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

  render() {
    return this.props.children;
  }
}

function mapStateToProps(state) {
  return {
    systemMessage: state.appState.systemMessage,
  };
}

export default connect(mapStateToProps)(SystemMessageHandler);
