import React from 'react';
import PropTypes from 'prop-types';
import { Page } from 'react-native-simple-components';
import { View } from 'react-native';

import styles from './styles';

const propTypes = {};

const defaultProps = {};

const Blank = ({ someProp }) => {
  return (
    <View style={styles.container}>
      <View />
    </View>
  );
};

Blank.propTypes = propTypes;
Blank.defaultProps = defaultProps;

export default Blank;
