import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Home from './Home';

export class HomeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  render() {
    return <Home />;
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(HomeContainer);
