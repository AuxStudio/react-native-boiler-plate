import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import database from '../../services/database';
import utils from '../../utils';

export class DatabaseHandler extends React.Component {
  componentDidMount() {
    if (this.props.authenticated) {
      this.listenForData();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.authenticated && !prevProps.authenticated) {
      this.listenForData();
    }
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func,
      authenticated: PropTypes.bool,
    };
  }

  listenForData = () => {
    database.listenForData(
      'app',
      (data) => {
        this.props.dispatch({
          type: 'SET_APP_DATA',
          payload: {
            ref: 'app',
            data,
          },
        });
      },
      (error) => {
        this.props.dispatch({
          type: 'SET_SYSTEM_MESSAGE',
          payload: utils.app.createError(error),
          error: true,
        });
      },
    );

    database.listenForData(
      'users',
      (data) => {
        this.props.dispatch({
          type: 'SET_APP_DATA',
          payload: {
            ref: 'users',
            data,
          },
        });
      },
      (error) => {
        this.props.dispatch({
          type: 'SET_SYSTEM_MESSAGE',
          payload: utils.app.createError(error),
          error: true,
        });
      },
    );
  };

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
