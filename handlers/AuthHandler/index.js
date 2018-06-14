import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class AuthHandler extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'getAuth',
    });
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func,
    };
  }

  render() {
    return null;
  }
}

export default connect()(AuthHandler);
