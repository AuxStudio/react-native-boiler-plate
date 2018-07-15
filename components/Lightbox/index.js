import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import Animator from 'react-native-simple-animators';
import { View } from 'react-native';
import { Touchable } from 'react-native-simple-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styleConstants from '../../styleConstants';

import styles from './styles';

export default class Lightbox extends React.Component {
  constructor(props) {
    super(props);

    this.animateOut = this.animateOut.bind(this);
    this.onBack = this.onBack.bind(this);

    this.state = {
      shouldAnimateOut: false,
    };
  }

  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {};

  animateOut() {
    this.setState({
      shouldAnimateOut: true,
    });
  }

  onBack() {
    Actions.pop();
  }

  render() {
    const { shouldAnimateOut } = this.state;
    const { children } = this.props;

    return (
      <Animator
        type="translateY"
        initialValue={styleConstants.dimensions.window.height}
        finalValue={0}
        shouldAnimateIn
        shouldAnimateOut={shouldAnimateOut}
        animateOutCallback={this.onBack}
        style={styles.container}
      >
        <Touchable onPress={this.animateOut} style={styles.iconContainer}>
          <Icon name="close" style={styles.icon} />
        </Touchable>
        <View style={styles.contentContainer}>{children}</View>
      </Animator>
    );
  }
}
