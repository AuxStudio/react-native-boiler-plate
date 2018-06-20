import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import { SystemMessageHandler } from '../';

jest.mock('react-native-snackbar', () => {
  return {
    show: jest.fn(),
    hide: jest.fn(),
  };
});

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

// on update showSnackbar is called
// after a timeout resetError is called which dispatches an action
describe('SystemMessageHandler', () => {
  let spy;
  const dispatch = jest.fn();

  it('shows the snackbar if systemMessage changed in componentDidUpdate', () => {
    const component = renderer.create(
      <SystemMessageHandler dispatch={dispatch}>
        <View />
      </SystemMessageHandler>,
    );
    const instance = component.getInstance();
    spy = jest.spyOn(instance, 'showSnackbar');

    component.update(
      <SystemMessageHandler
        dispatch={dispatch}
        systemMessage={{
          message: 'Something went wrong',
          code: 'AUTH',
          error: true,
        }}
      >
        <View />
      </SystemMessageHandler>,
    );

    expect(spy).toHaveBeenCalled();

    // TODO: test timeout
  });
});

// TODO: test componentDidUpdate with different message
