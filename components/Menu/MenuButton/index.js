import React from 'react';
import PropTypes from 'prop-types';
import { Text, ViewPropTypes } from 'react-native';
import { Touchable } from 'react-native-simple-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const propTypes = {
  iconName: PropTypes.string,
  handlePress: PropTypes.func,
  iconStyle: Text.propTypes.style,
  style: ViewPropTypes.style,
  testID: PropTypes.string,
};

const defaultProps = {
  iconName: 'menu',
};

const MenuButton = ({ iconName, handlePress, iconStyle, style, testID }) => {
  return (
    <Touchable onPress={handlePress} style={[styles.menuButton, style]} testID={testID}>
      <Icon name={iconName} style={[styles.menuButtonIcon, iconStyle]} />
    </Touchable>
  );
};

MenuButton.propTypes = propTypes;
MenuButton.defaultProps = defaultProps;

export default MenuButton;
