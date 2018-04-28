import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

import Example from './Example';

const propTypes = {};

const defaultProps = {};

const ExampleContainer = ({ someProp }) => {
  const newProp = someProp; // do some business logic

  return <Example someProp={newProp} />;
};

ExampleContainer.propTypes = propTypes;
ExampleContainer.defaultProps = defaultProps;

export default ExampleContainer;
