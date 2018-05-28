import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Text, ViewPropTypes } from 'react-native';
import { TextField } from 'react-native-material-textfield';

import styleConstants from '../../styleConstants';

const propTypes = {
  value: PropTypes.string,
  handleChangeText: PropTypes.func,
  label: PropTypes.string.isRequired,
  title: PropTypes.string,
  error: PropTypes.string,
  characterRestriction: PropTypes.number,
  disabled: PropTypes.bool,
  baseColor: PropTypes.string,
  tintColor: PropTypes.string,
  labelTextStyle: Text.propTypes.style,
  titleTextStyle: Text.propTypes.style, // also errorTextStyle
  style: TextInput.propTypes.style,
  containerStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
  renderAccessory: PropTypes.func,

  autoFocus: PropTypes.bool,
  keyboardType: PropTypes.string, // default, numeric, email-address, phone-pad
  multiline: PropTypes.bool,
  returnKeyType: PropTypes.string, // done, go, next, search, send
  secureTextEntry: PropTypes.bool,
  handleBlur: PropTypes.func,
  handleFocus: PropTypes.func,
  handleSubmit: PropTypes.func,
};

const defaultProps = {
  tintColor: styleConstants.colors.primary,
};

const Input = ({
  value,
  handleChangeText,
  label,
  title,
  error,
  characterRestriction,
  disabled,
  baseColor,
  tintColor,
  labelTextStyle,
  titleTextStyle,
  style,
  containerStyle,
  inputContainerStyle,
  renderAccessory,

  autoFocus,
  keyboardType,
  multiline,
  returnKeyType,
  secureTextEntry,
  handleBlur,
  handleFocus,
  handleSubmit,
}) => {
  return (
    <TextField
      value={value}
      onChangeText={(text) => handleChangeText(text)}
      label={label}
      title={title}
      error={error}
      characterRestriction={characterRestriction}
      disabled={disabled}
      baseColor={baseColor}
      tintColor={tintColor}
      labelTextStyle={labelTextStyle}
      titleTextStyle={titleTextStyle}
      style={style}
      containerStyle={containerStyle}
      inputContainerStyle={inputContainerStyle}
      renderAccessory={renderAccessory}
      autoFocus={autoFocus}
      keyboardType={keyboardType}
      multiline={multiline}
      returnKeyType={returnKeyType}
      secureTextEntry={secureTextEntry}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onSubmitEditing={handleSubmit}
    />
  );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
