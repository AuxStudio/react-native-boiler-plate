import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from 'react-native-snackbar';

export class SystemMessageHandler extends React.Component {
  constructor(props) {
    super(props);

    this.showSnackbar = this.showSnackbar.bind(this);
    this.resetError = this.resetError.bind(this);

    this.snackbarDuration = 2750;
  }

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

  showSnackbar() {
    Snackbar.show({
      title: this.props.systemMessage.message,
      duration: this.snackbarDuration,
    });

    setTimeout(() => {
      this.resetError();
    }, this.snackbarDuration); // Snackbar.LENGTH_LONG does not work here so we need to manually add the duration
  }

  resetError() {
    this.props.dispatch({
      type: 'RESET_SYSTEM_MESSAGE',
    });
  }

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
