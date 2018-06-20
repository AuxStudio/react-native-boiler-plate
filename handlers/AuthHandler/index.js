import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class AuthHandler extends React.Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'getAuth',
    });
  }

  render() {
    return null;
  }
}

export default connect()(AuthHandler);
