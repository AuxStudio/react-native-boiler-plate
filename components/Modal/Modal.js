import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Modal from 'react-native-modal';

const propTypes = {
  isVisible: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};

const defaultProps = {};

const ModalComponent = ({ isVisible, handleClose, children }) => {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={handleClose}
        onSwipe={handleClose}
        swipeDirection="down"
        hideModalContentWhileAnimating
      >
        {children}
      </Modal>
    </View>
  );
};

ModalComponent.propTypes = propTypes;
ModalComponent.defaultProps = defaultProps;

export default ModalComponent;
