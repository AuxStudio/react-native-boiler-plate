import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from './styles';

const propTypes = {
  title: PropTypes.string,
};

const defaultProps = {
  title: 'Title Text',
};

const Example = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

Example.propTypes = propTypes;
Example.defaultProps = defaultProps;

export default Example;
