import React from 'react';
import PropTypes from 'prop-types';
import { Page, InfoBlock } from 'react-native-simple-components';

import styleConstants from '../../../static/styleConstants';
import styles from './styles';

const propTypes = {
  message: PropTypes.string,
};

const defaultProps = {
  message: 'Something went wrong.',
};

const Error = ({ message }) => {
  return (
    <Page style={styles.container}>
      <InfoBlock title="Error" description={message} />
    </Page>
  );
};

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default Error;
