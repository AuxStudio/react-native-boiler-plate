import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import { SystemMessageHandler } from '..';

jest.mock('react-native-snackbar', () => {
  return {
    show: jest.fn(),
    hide: jest.fn(),
  };
});

describe('SystemMessageHandler', () => {
  let spy;
  const dispatch = jest.fn();

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

  it('shows the snackbar if systemMessage changed in componentDidUpdate', () => {
    const component = renderer.create(
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
    const instance = component.getInstance();
    spy = jest.spyOn(instance, 'showSnackbar');

    component.update(
      <SystemMessageHandler
        dispatch={dispatch}
        systemMessage={{
          message: 'Same same, but different',
          code: 'AUTH',
          error: true,
        }}
      >
        <View />
      </SystemMessageHandler>,
    );

    expect(spy).toHaveBeenCalled();
  });

  it('shows the snackbar if systemMessage changed in componentDidUpdate and calls resetError after timeout', (done) => {
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

    spy.mockReset();

    spy = jest.spyOn(instance, 'resetError');

    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();

      done();
    }, instance.snackbarDuration);
  });

  afterEach(() => {
    if (spy) {
      spy.mockReset();
    }
  });
});
