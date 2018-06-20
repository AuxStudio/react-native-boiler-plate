import React from 'react';
import renderer from 'react-test-renderer';

import { AuthHandler } from '../';

it('renders a AuthHandler', () => {
  expect(renderer.create(<AuthHandler dispatch={jest.fn()} />)).toMatchSnapshot();
});

it('dispatches getAuth on mount', () => {
  const spy = jest.spyOn(AuthHandler.prototype, 'getAuth');
  const dispatch = jest.fn();

  renderer.create(<AuthHandler dispatch={dispatch} />);

  expect(spy).toHaveBeenCalled();
  expect(dispatch).toMatchSnapshot();
});
