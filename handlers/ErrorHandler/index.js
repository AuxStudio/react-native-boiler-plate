import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Error from '../../scenes/Error';

export class ErrorHandler extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    children: PropTypes.node.isRequired,
    uid: PropTypes.string,
  };

  static defaultProps = {};

  state = {
    hasError: null,
  };

  componentDidCatch(error) {
    // Catch errors in children
    this.setState({ hasError: true });

    this.props.dispatch({
      type: 'logError',
      payload: {
        error,
        uid: this.props.uid,
      },
    });
  }

  render() {
    if (this.state.hasError) {
      return <Error />;
    }

    return this.props.children;
  }
}

function mapStateToProps(state) {
  return {
    uid: state.user.uid,
  };
}

export default connect(mapStateToProps)(ErrorHandler);
