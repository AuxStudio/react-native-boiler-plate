import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Home extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  state = {};

  render() {
    return (
      <View>
        <View />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Home);
