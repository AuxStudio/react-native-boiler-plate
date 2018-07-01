import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import Input from '..';

describe('Input', () => {
  it('renders with all props', () => {
    expect(
      renderer.create(
        <Input
          value=""
          handleChangeText={jest.fn()}
          label="Test"
          title="Title"
          error="Error"
          characterRestriction={100}
          baseColor="red"
          tintColor="blue"
          labelTextStyle={{ color: 'red' }}
          titleTextStyle={{ color: 'blue' }}
          style={{ backgroundColor: 'green' }}
          containerStyle={{ backgroundColor: 'purple' }}
          inputContainerStyle={{ backgroundColor: 'orange' }}
          keyboardType="numeric"
          multiline
          returnKeyType="search"
          secureTextEntry
          disabled
          renderAccessory={() => <View />}
          handleBlur={jest.fn()}
          handleFocus={jest.fn()}
          handleSubmit={jest.fn()}
        />,
      ),
    ).toMatchSnapshot();
  });

  it('renders with minimum required props', () => {
    expect(renderer.create(<Input label="Test" />)).toMatchSnapshot();
  });
});
