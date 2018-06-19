import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import { ErrorHandler } from '../';

it('renders a ErrorHandler with all props', () => {
  expect(
    renderer.create(
      <ErrorHandler dispatch={jest.fn()} uid="xxxx-xxxx-xxxx-xxxx">
        <View />
      </ErrorHandler>,
    ),
  ).toMatchSnapshot();
});

it('renders a ErrorHandler with minimum required props', () => {
  expect(
    renderer.create(
      <ErrorHandler dispatch={jest.fn()}>
        <View />
      </ErrorHandler>,
    ),
  ).toMatchSnapshot();
});
