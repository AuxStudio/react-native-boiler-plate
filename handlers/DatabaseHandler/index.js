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
    if (this.props.authenticated) {
      this.listenForData();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.authenticated && !prevProps.authenticated) {
      this.listenForData();
    }
  }

  listenForData() {
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
          type: 'logError',
          payload: {
            error: utils.app.createError(error),
            date: new Date(),
            uid: this.props.uid,
          },
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
          type: 'logError',
          payload: {
            error: utils.app.createError(error),
            date: new Date(),
            uid: this.props.uid,
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
