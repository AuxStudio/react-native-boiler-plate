import React from 'react';
import PropTypes from 'prop-types';
import { SnackBar } from 'react-native-simple-components';

import styles from './styles';

const propTypes = {
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  shouldAutoHide: PropTypes.bool,
};

const defaultProps = {};

const SnackBarComponent = ({ message, handleClose, shouldAutoHide }) => {
  return (
    <SnackBar
      text={message}
      handleClose={handleClose}
      shouldAutoHide={shouldAutoHide}
      containerStyle={styles.container}
      textStyle={styles.text}
    />
  );
};

SnackBarComponent.propTypes = propTypes;
SnackBarComponent.defaultProps = defaultProps;

export default SnackBarComponent;
