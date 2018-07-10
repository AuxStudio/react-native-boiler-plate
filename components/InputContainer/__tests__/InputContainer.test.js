import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import InputContainer from '..';

describe('InputContainer', () => {
  it('renders with all props', () => {
    expect(
      renderer.create(
        <InputContainer
          containerStyle={{ backgroundColor: 'red' }}
          contentContainerStyle={{ backgroundColor: 'blue' }}
        >
          <View />
        </InputContainer>,
      ),
    ).toMatchSnapshot();
  });

  it('renders with minimum required props', () => {
    expect(renderer.create(<InputContainer />)).toMatchSnapshot();
  });
});
