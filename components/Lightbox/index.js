import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import Animator from 'react-native-simple-animators';
import { View, Text, BackHandler } from 'react-native';
import { Touchable } from 'react-native-simple-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styleConstants from '../../styleConstants';

import styles from './styles';

import InputContainer from '../InputContainer';

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
    handleClose: PropTypes.func,
    disableClose: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidMount() {
    // Disable back android
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }

  animateOut() {
    this.setState({
      shouldAnimateOut: true,
    });
  }

  onBack() {
    const { handleClose } = this.props;

    if (handleClose) {
      handleClose();
    } else {
      Actions.pop();
    }
  }

  render() {
    const { shouldAnimateOut } = this.state;
    const { children, disableClose } = this.props;

    const closeComponent = !disableClose ? (
      <Touchable onPress={this.animateOut} style={styles.iconContainer}>
        <Icon name="close" style={styles.icon} />
      </Touchable>
    ) : null;

    return (
      <Animator
        type="translateY"
        initialValue={styleConstants.dimensions.window.height}
        finalValue={0}
        shouldAnimateIn
        shouldAnimateOut={shouldAnimateOut}
        animateOutCallback={this.onBack}
        style={styles.wrapper}
      >
        <InputContainer
          containerStyle={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {closeComponent}

          {children}
        </InputContainer>
      </Animator>
    );
  }
}
