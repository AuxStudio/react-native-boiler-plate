import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styleConstants from '../../../styleConstants';
import styles from './styles';

const propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string,
  isLoading: PropTypes.bool,
};

const defaultProps = {};

const CodePushStatus = ({ iconName, text, isLoading }) => {
  const iconComponent = isLoading ? (
    <ActivityIndicator size="small" color={styleConstants.colors.green} style={styles.loader} />
  ) : (
    <Icon name={iconName} style={styles.icon} />
  );

  return (
    <View style={styles.container}>
      {iconComponent}

      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

CodePushStatus.propTypes = propTypes;
CodePushStatus.defaultProps = defaultProps;

export default CodePushStatus;
