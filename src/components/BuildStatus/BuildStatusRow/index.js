import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import styles from './styles';

const propTypes = {
  labelText: PropTypes.string,
  valueText: PropTypes.string,
};

const defaultProps = {};

const BuildStatusRow = ({ labelText, valueText }) => {
  return (
    <Text style={styles.text}>
      <Text style={styles.boldText}>{labelText} </Text>
      {valueText}
    </Text>
  );
};

BuildStatusRow.propTypes = propTypes;
BuildStatusRow.defaultProps = defaultProps;

export default BuildStatusRow;
