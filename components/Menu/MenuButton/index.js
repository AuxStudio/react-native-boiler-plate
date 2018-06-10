import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Touchable } from 'react-native-simple-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const propTypes = {
  handlePress: PropTypes.func,
};

const defaultProps = {};

const MenuButton = ({ handlePress }) => {
  return (
    <Touchable onPress={handlePress} style={styles.menuButton}>
      <Icon name="menu" style={styles.menuButtonIcon} />
    </Touchable>
  );
};

MenuButton.propTypes = propTypes;
MenuButton.defaultProps = defaultProps;

export default MenuButton;
