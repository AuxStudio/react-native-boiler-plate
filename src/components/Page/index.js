import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import { StatusBar } from 'react-native-simple-components';

import styleConstants from '../../styleConstants';

import styles from './styles';

const propTypes = {
  verticalCenter: PropTypes.bool,
  horizontalCenter: PropTypes.bool,
  children: PropTypes.node,
  style: ViewPropTypes.style,
  testID: PropTypes.string,
};

const defaultProps = {};

const Page = ({ verticalCenter, horizontalCenter, children, style, testID }) => {
  const verticalCenterStyles = verticalCenter && {
    justifyContent: 'center',
  };
  const horizontalCenterStyles = horizontalCenter && {
    alignItems: 'center',
  };

  return (
    <View
      style={[styles.container, verticalCenterStyles, horizontalCenterStyles, style]}
      testID={testID}
    >
      <StatusBar backgroundColor={styleConstants.colors.primary} barStyle="light-content" />

      {children}
    </View>
  );
};

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;
