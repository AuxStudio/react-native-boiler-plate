import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from 'react-native-snackbar';

export class SystemMessageHandler extends React.Component {
  constructor(props) {
    super(props);

    this.showSnackbar = this.showSnackbar.bind(this);
    this.resetError = this.resetError.bind(this);

    this.snackbarDuration = 4000;
  }

  static propTypes = {
    dispatch: PropTypes.func,
    children: PropTypes.node.isRequired,
    systemMessage: PropTypes.string,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    const { systemMessage } = this.props;

    if (systemMessage && (!prevProps.systemMessage || systemMessage !== prevProps.systemMessage)) {
      this.showSnackbar();
    }
  }

  showSnackbar() {
    const { systemMessage } = this.props;

    Snackbar.show({
      title: systemMessage,
      duration: this.snackbarDuration,
    });

    setTimeout(() => {
      this.resetError();
    }, this.snackbarDuration); // Snackbar.LENGTH_LONG does not work here so we need to manually add the duration
  }

  resetError() {
    const { dispatch } = this.props;

    dispatch({
      type: 'RESET_SYSTEM_MESSAGE',
    });
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

function mapStateToProps(state) {
  return {
    systemMessage: state.appState.systemMessage,
  };
}

export default connect(mapStateToProps)(SystemMessageHandler);
