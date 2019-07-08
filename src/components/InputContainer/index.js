import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';

const propTypes = {
  containerStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  children: PropTypes.node,
};

const defaultProps = {};

const InputContainer = ({ containerStyle, contentContainerStyle, children }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={contentContainerStyle}
      >
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};

InputContainer.propTypes = propTypes;
InputContainer.defaultProps = defaultProps;

export default InputContainer;
