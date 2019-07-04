import React from 'react';
import PropTypes from 'prop-types';
import { Page } from 'react-native-simple-components';
import { Text } from 'react-native';

import styles from './styles';

const propTypes = {};

const defaultProps = {};

const Home = ({ someProp }) => {
  return (
    <Page verticalCenter horizontalCenter>
      <Text>Hello World!</Text>
    </Page>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
