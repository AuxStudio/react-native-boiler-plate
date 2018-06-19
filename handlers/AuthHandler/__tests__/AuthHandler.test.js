import React from 'react';
import renderer from 'react-test-renderer';

import { AuthHandler } from '../';

it('renders a AuthHandler', () => {
  expect(renderer.create(<AuthHandler dispatch={jest.fn()} />)).toMatchSnapshot();
});

it('dispatches getAuth on mount', () => {
  const dispatch = jest.fn();

  jest.spyOn(AuthHandler.prototype, 'componentDidMount');
  renderer.create(<AuthHandler dispatch={dispatch} />);

  expect(dispatch).toMatchSnapshot(); // dispatch function has been called
});
