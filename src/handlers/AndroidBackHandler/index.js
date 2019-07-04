import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';

import utils from '../../utils';

// NOTE: It is important that this component renders after our scenes
export class AndroidBackHandler extends React.Component {
  constructor(props) {
    super(props);

    this.handleBackPress = this.handleBackPress.bind(this);
    this.exitApp = this.exitApp.bind(this);
    this.navigate = this.navigate.bind(this);

    this.state = {};
  }

  static propTypes = {
    scene: PropTypes.string,
  };

  static defaultProps = {};

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress() {
    const { scene } = this.props;
    const isHome = !scene || scene === '_home';

    if (isHome) {
      this.exitApp();
    } else {
      this.navigate(); // pop the scene
    }

    return true;
  }

  exitApp() {
    BackHandler.exitApp();
  }

  navigate(page, props) {
    utils.navigation.navigate(page, props);
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    scene: state.navigation.scene,
  };
}

export default connect(mapStateToProps)(AndroidBackHandler);
