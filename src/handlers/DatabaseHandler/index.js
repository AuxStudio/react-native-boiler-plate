import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class DatabaseHandler extends React.Component {
  constructor(props) {
    super(props);

    this.handleSyncData = this.handleSyncData.bind(this);
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func,
      authenticated: PropTypes.bool,
    };
  }

  componentDidMount() {
    const { authenticated } = this.props;

    if (authenticated) {
      this.handleSyncData();
    }
  }

  componentDidUpdate(prevProps) {
    const { authenticated } = this.props;

    if (authenticated && !prevProps.authenticated) {
      this.handleSyncData();
    }
  }

  handleSyncData() {
    // NOTE: This is a placeholder for now but this should call other methods, ie. syncReviews
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.user.authenticated,
  };
}

export default connect(mapStateToProps)(DatabaseHandler);
