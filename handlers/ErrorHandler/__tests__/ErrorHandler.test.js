import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import { ErrorHandler } from '../';

jest.mock('../../../scenes/Error'); // Error scene that is displayed on error

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

it('catches errors in componentDidCatch', () => {
  function ProblemChild() {
    throw new Error('Error thrown from problem child');
    return <div>Error</div>; // eslint-disable-line
  }

  const dispatch = jest.fn();

  const spy = jest.spyOn(ErrorHandler.prototype, 'componentDidCatch');

  const component = renderer.create(
    <ErrorHandler dispatch={dispatch}>
      <ProblemChild />
    </ErrorHandler>,
  );
  const instance = component.getInstance();
  const { root } = component;

  expect(instance.state.hasError).toBe(true);

  const errorPage = root.findByProps({ testID: 'errorPage' });
  expect(errorPage).toBeDefined();
  expect(spy).toHaveBeenCalled();
  expect(dispatch).toMatchSnapshot(); // dispatch function has been called

  spy.mockClear();
});
