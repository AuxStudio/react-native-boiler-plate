import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class DatabaseHandler extends React.Component {
  constructor(props) {
    super(props);

    this.syncData = this.syncData.bind(this);
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
      this.syncData();
    }
  }

  componentDidUpdate(prevProps) {
    const { authenticated } = this.props;

    if (authenticated && !prevProps.authenticated) {
      this.syncData();
    }
  }

  syncData() {
    const { dispatch } = this.props;

    // Sync data on app mount
    dispatch({
      type: 'TEMP',
      // type: 'sync',
      // meta: {
      //   pathParts: [''],
      //   nextAction: {
      //     type: 'SET_APP_DATA',
      //     payload: {
      //       ref: 'app',
      //     },
      //   },
      // },
    });
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
