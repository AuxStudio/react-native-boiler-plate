/* eslint-disable import/first */
import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import InputContainer from '../';

it('renders a InputContainer', () => {
  expect(
    renderer.create(
      <InputContainer
        wrapperStyle={{ backgroundColor: 'red' }}
        containerStyle={{ backgroundColor: 'blue' }}
      >
        <View />
      </InputContainer>,
    ),
  ).toMatchSnapshot();
});

it('renders a InputContainer with minimum required props', () => {
  expect(renderer.create(<InputContainer />)).toMatchSnapshot();
});
/* eslint-enable */
