import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import { ErrorHandler } from '..';

jest.mock('../../../scenes/pages/Error'); // Error scene that is displayed on error

describe('ErrorHandler', () => {
  let spy;
  const dispatch = jest.fn();

  function ProblemChild() {
    throw new Error('Error thrown from problem child');
    return <div>Error</div>; // eslint-disable-line
  }

  it('renders with all props', () => {
    expect(
      renderer.create(
        <ErrorHandler dispatch={jest.fn()} uid="xxxx-xxxx-xxxx-xxxx">
          <View />
        </ErrorHandler>,
      ),
    ).toMatchSnapshot();
  });

  it('renders with minimum required props', () => {
    expect(
      renderer.create(
        <ErrorHandler dispatch={jest.fn()}>
          <View />
        </ErrorHandler>,
      ),
    ).toMatchSnapshot();
  });

  it('catches errors in componentDidCatch', () => {
    spy = jest.spyOn(ErrorHandler.prototype, 'componentDidCatch');

    const component = renderer.create(
      <ErrorHandler dispatch={dispatch}>
        <ProblemChild />
      </ErrorHandler>,
    );
    const instance = component.getInstance();

    expect(instance.state.hasError).toBe(true);
    expect(component).toMatchSnapshot();
    expect(spy).toHaveBeenCalled();
    expect(dispatch).toMatchSnapshot(); // dispatch function has been called
  });

  afterEach(() => {
    if (spy) {
      spy.mockClear();
    }
  });
});
