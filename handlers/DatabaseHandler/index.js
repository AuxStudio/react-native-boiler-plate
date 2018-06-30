import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import database from '../../services/database';
import utils from '../../utils';

export class DatabaseHandler extends React.Component {
  constructor(props) {
    super(props);

    this.listenForData = this.listenForData.bind(this);
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func,
      authenticated: PropTypes.bool,
      uid: PropTypes.string,
    };
  }

  componentDidMount() {
    const { authenticated } = this.props;

    if (authenticated) {
      this.listenForData();
    }
  }

  componentDidUpdate(prevProps) {
    const { authenticated } = this.props;

    if (authenticated && !prevProps.authenticated) {
      this.listenForData();
    }
  }

  listenForData() {
    const { dispatch, uid } = this.props;

    database.listenForData(
      'app',
      (data) => {
        dispatch({
          type: 'SET_APP_DATA',
          payload: {
            ref: 'app',
            data,
          },
        });
      },
      (error) => {
        dispatch({
          type: 'logError',
          payload: {
            error: utils.app.createError(error),
            date: new Date(),
            uid,
          },
        });
      },
    );

    database.listenForData(
      'users',
      (data) => {
        dispatch({
          type: 'SET_APP_DATA',
          payload: {
            ref: 'users',
            data,
          },
        });
      },
      (error) => {
        dispatch({
          type: 'logError',
          payload: {
            error: utils.app.createError(error),
            date: new Date(),
            uid: uid,
          },
        });
      },
    );
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.user.authenticated,
    uid: state.user.uid,
  };
}

export default connect(mapStateToProps)(DatabaseHandler);
