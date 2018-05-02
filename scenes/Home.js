import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Page } from 'react-native-simple-components';

import Example from '../components/Example';

export class Home extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  state = {};

  render() {
    return (
      <Page>
        <Example title="home" />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Home);
