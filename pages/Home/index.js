import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Page } from 'react-native-simple-components';
import { Text } from 'react-native';

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.navigate = this.navigate.bind(this);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  navigate(page, props) {
    if (page) {
      Actions[page](props);
    }
    Actions.pop(); // default action
  }

  render() {
    return (
      <Page verticalCenter horizontalCenter>
        <Text>Hello World!</Text>
      </Page>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Home);
