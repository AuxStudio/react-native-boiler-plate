import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import { SystemMessageHandler } from '../';

it('renders a SystemMessageHandler with all props', () => {
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

// TODO: Integration: when new system message, logErrorToDatabase and showSnackbar should be called

it('renders a SystemMessageHandler with minimum required props', () => {
  expect(
    renderer.create(
      <SystemMessageHandler dispatch={jest.fn()}>
        <View />
      </SystemMessageHandler>,
    ),
  ).toMatchSnapshot();
});
