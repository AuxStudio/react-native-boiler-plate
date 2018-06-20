import React from 'react';
import renderer from 'react-test-renderer';

import { LocationHandler } from '../';

describe('handles props', () => {
  it('renders with all/minimum required props', () => {
    expect(renderer.create(<LocationHandler dispatch={jest.fn()} />)).toMatchSnapshot();
  });
});

describe('handles its methods', () => {
  let spy;
  const dispatch = jest.fn();

  it('dispatches getLocationPermission on mount', () => {
    spy = jest.spyOn(LocationHandler.prototype, 'getLocationPermission');

    renderer.create(<LocationHandler dispatch={dispatch} />);

    expect(spy).toHaveBeenCalled();
    expect(dispatch).toMatchSnapshot();
  });

  afterEach(() => {
    if (spy) {
      spy.mockReset();
    }
  });
});
