import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';

const propTypes = {
  wrapperStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  children: PropTypes.node,
};

const defaultProps = {};

const InputContainer = ({ wrapperStyle, containerStyle, children }) => {
  return (
    <View style={[styles.container, wrapperStyle]}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={containerStyle}
      >
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};

InputContainer.propTypes = propTypes;
InputContainer.defaultProps = defaultProps;

export default InputContainer;
