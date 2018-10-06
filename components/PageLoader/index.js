import React from 'react';
import { ActivityIndicator } from 'react-native';

import styleConstants from '../../styleConstants';
import styles from './styles';

import Page from '../Page';

const propTypes = {};

const defaultProps = {};

const PageLoader = () => {
  return (
    <Page verticalCenter horizontalCenter style={styles.container}>
      <ActivityIndicator size="large" color={styleConstants.colors.white} />
    </Page>
  );
};

PageLoader.propTypes = propTypes;
PageLoader.defaultProps = defaultProps;

export default PageLoader;
