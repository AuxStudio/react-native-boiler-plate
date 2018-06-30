import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class AuthHandler extends React.Component {
  constructor(props) {
    super(props);

    this.getAuth = this.getAuth.bind(this);
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func,
    };
  }

  componentDidMount() {
    this.getAuth();
  }

  getAuth() {
    const { dispatch } = this.props;

    dispatch({
      type: 'getAuth',
    });
  }

  render() {
    return null;
  }
}

export default connect()(AuthHandler);
