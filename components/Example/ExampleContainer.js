import React from 'react';
import PropTypes from 'prop-types';

import Example from './Example';

const propTypes = {
  title: PropTypes.string,
};

const defaultProps = {
  title: 'Example',
};

const ExampleContainer = ({ title }) => {
  const upperCasedTitle = title.toUpperCase(); // do some business logic

  return <Example title={upperCasedTitle} />;
};

ExampleContainer.propTypes = propTypes;
ExampleContainer.defaultProps = defaultProps;

export default ExampleContainer;
