import React from 'react';
import { View } from 'react-native';

import { version } from '../../config';
import styles from './styles';

import BuildStatusRow from './BuildStatusRow';

const propTypes = {};

const defaultProps = {};

const BuildStatus = () => {
  return (
    <View style={styles.container}>
      <BuildStatusRow
        labelText="Version:"
        valueText={`${version.major}.${version.minor}.${version.patch} | `}
      />

      <BuildStatusRow labelText="Build:" valueText={`${version.build} | `} />

      <BuildStatusRow labelText="Code:" valueText={`${version.code}`} />
    </View>
  );
};

BuildStatus.propTypes = propTypes;
BuildStatus.defaultProps = defaultProps;

export default BuildStatus;
