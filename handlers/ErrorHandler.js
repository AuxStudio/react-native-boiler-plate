import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Error from '../scenes/Error';

export class ErrorHandler extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    children: PropTypes.node,
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
    // Log errors that stream in from store
    if (this.props.systemMessage.error && !prevProps.systemMessage.error) {
      this.logErrorToDatabase(this.props.systemMessage);
    }
  }

  componentDidCatch(error) {
    // Catch errors in children
    this.setState({ hasError: true });

    this.logErrorToDatabase(error);
  }

  logErrorToDatabase = (error) => {
    // Log error to database
    this.props.dispatch({
      type: 'logError',
      payload: {
        data: {
          message: error.message,
          code: error.code,
          date: Date.now(),
          uid: this.props.uid,
        },
      },
    });
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

export default connect(mapStateToProps)(ErrorHandler);
