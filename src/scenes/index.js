import React from 'react';
import PropTypes from 'prop-types';
import { Router, Reducer, Actions, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Home from './pages/Home';

/*
 * Add your scenes here
 */
const scenes = Actions.create(
  <Scene key="root" hideNavBar>
    <Scene key="home" component={Home} />
  </Scene>,
);

export class Scenes extends React.Component {
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

export default connect()(Scenes);
