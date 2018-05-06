import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SnackBar from '../components/SnackBar';

export class SnackBarHandler extends React.Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func,
      children: PropTypes.node,
      systemMessage: PropTypes.shape({
        message: PropTypes.string,
        code: PropTypes.string,
        error: PropTypes.bool,
      }),
    };
  }

  resetError = () => {
    this.props.dispatch({
      type: 'RESET_SYSTEM_MESSAGE',
    });
  };

  render() {
    const { message } = this.props.systemMessage;

    const snackBarComponent = message ? (
      <SnackBar message={message} handleClose={this.resetError} shouldAutoHide />
    ) : null;

    return (
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        {this.props.children}
        {snackBarComponent}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    systemMessage: state.appState.systemMessage,
  };
}

export default connect(mapStateToProps)(SnackBarHandler);
