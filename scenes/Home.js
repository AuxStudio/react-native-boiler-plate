import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Page } from 'react-native-simple-components';
import { Text } from 'react-native';

export class Home extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  state = {};

  render() {
    return (
      <Page verticalCenter horizontalCenter>
        <Text>Hello World!</Text>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Home);
