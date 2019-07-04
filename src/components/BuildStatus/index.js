import React from 'react';
import { View } from 'react-native';

import config from '../../config';
import styles from './styles';

import BuildStatusRow from './BuildStatusRow';

const propTypes = {};

const defaultProps = {};

const BuildStatus = () => {
  return (
    <View style={styles.container}>
      <BuildStatusRow
        labelText="Version:"
        valueText={`${config.version.major}.${config.version.minor}.${config.version.patch} | `}
      />

      <BuildStatusRow labelText="Build:" valueText={`${config.version.build} | `} />

      <BuildStatusRow labelText="Code:" valueText={`${config.version.code}`} />
    </View>
  );
};

BuildStatus.propTypes = propTypes;
BuildStatus.defaultProps = defaultProps;

export default BuildStatus;
