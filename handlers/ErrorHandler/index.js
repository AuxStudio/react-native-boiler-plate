import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Error from '../../scenes/pages/Error';

/*
  This handler's responsibility is to:

  - Catch errors in it's children
  - If an error is caught:
    - Render an error state
    - Log it
*/
export class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);

    this.setHasError = this.setHasError.bind(this);
    this.logError = this.logError.bind(this);

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
    this.setHasError(true);
    this.logError(error);
  }

  setHasError(hasError) {
    this.setState({ hasError });
  }

  logError(error) {
    const { dispatch, uid } = this.props;

    dispatch({
      type: 'logError',
      payload: {
        error,
        uid,
      },
    });
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
