import React from 'react';
import PropTypes from 'prop-types';
import { Router, Reducer } from 'react-native-router-flux';
import { connect } from 'react-redux';

import scenes from './scenes';

export class Routes extends React.Component {
  constructor(props) {
    super(props);

    this.createReducer = this.createReducer.bind(this);
  }

  static propTypes = {
    dispatch: PropTypes.func,
  };

  createReducer(params) {
    const { dispatch } = this.props;

    const defaultReducer = Reducer(params);
    return (state, action) => {
      dispatch(action);
      return defaultReducer(state, action);
    };
  }

  render() {
    return <Router createReducer={this.createReducer} scenes={scenes} />;
  }
}

export default connect()(Routes);
