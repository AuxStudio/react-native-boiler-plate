import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import { SystemMessageHandler } from '../';

describe('SystemMessageHandler', () => {
  it('renders with all props', () => {
    expect(
      renderer.create(
        <SystemMessageHandler
          dispatch={jest.fn()}
          systemMessage={{
            message: 'Something went wrong',
            code: 'AUTH',
            error: true,
          }}
          uid="xxxx-xxxx-xxxx-xxxx"
        >
          <View />
        </SystemMessageHandler>,
      ),
    ).toMatchSnapshot();
  });

  it('renders with minimum required props', () => {
    expect(
      renderer.create(
        <SystemMessageHandler dispatch={jest.fn()}>
          <View />
        </SystemMessageHandler>,
      ),
    ).toMatchSnapshot();
  });
});
