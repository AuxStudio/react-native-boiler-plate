/* eslint-disable import/first */
import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import Input from '../';

// NOTE: autofocus is not tested due to it not being supported by jest
it('renders a Input', () => {
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
        handleBlur={jest.fn()}
        handleFocus={jest.fn()}
        handleSubmit={jest.fn()}
      />,
    ),
  ).toMatchSnapshot();
});

it('renders a disabled Input', () => {
  expect(renderer.create(<Input label="Test" disabled />)).toMatchSnapshot();
});

// render accessory
it('renders a Input with accessory', () => {
  expect(
    renderer.create(<Input label="Test" renderAccessory={() => <View />} />),
  ).toMatchSnapshot();
});

it('renders a Input with minimum required props', () => {
  expect(renderer.create(<Input label="Test" />)).toMatchSnapshot();
});
/* eslint-enable */
