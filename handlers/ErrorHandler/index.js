import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Error from '../../scenes/pages/Error';

export class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);

    this.setHasError = this.setHasError.bind(this);

    this.state = {
      hasError: null,
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    children: PropTypes.node.isRequired,
    uid: PropTypes.string,
  };

  static defaultProps = {};

  componentDidCatch(error) {
    const { dispatch, uid } = this.props;

    // Catch errors in children
    this.setHasError();

    dispatch({
      type: 'logError',
      payload: {
        error,
        uid,
      },
    });
  }

  setHasError() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <Error />;
    }

    return children;
  }
}

function mapStateToProps(state) {
  return {
    uid: state.user.uid,
  };
}

export default connect(mapStateToProps)(ErrorHandler);
