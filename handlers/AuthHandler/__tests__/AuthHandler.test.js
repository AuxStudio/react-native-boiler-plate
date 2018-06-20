import React from 'react';
import renderer from 'react-test-renderer';

import { AuthHandler } from '../';

it('renders a AuthHandler', () => {
  expect(renderer.create(<AuthHandler dispatch={jest.fn()} />)).toMatchSnapshot();
});

describe('handles its methods', () => {
  let spy;
  const dispatch = jest.fn();

  it('dispatches getAuth on mount', () => {
    spy = jest.spyOn(AuthHandler.prototype, 'getAuth');

    renderer.create(<AuthHandler dispatch={dispatch} />);

    expect(spy).toHaveBeenCalled();
    expect(dispatch).toMatchSnapshot();
  });

  afterEach(() => {
    if (spy) {
      spy.mockReset();
    }
  });
});
