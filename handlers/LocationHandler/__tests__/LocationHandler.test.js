import React from 'react';
import renderer from 'react-test-renderer';

import { LocationHandler } from '..';

describe('LocationHandler', () => {
  let spy;
  const dispatch = jest.fn();

  it('renders with all/minimum required props', () => {
    expect(renderer.create(<LocationHandler dispatch={jest.fn()} />)).toMatchSnapshot();
  });

  it('call getLocationPermission on componentDidMount', () => {
    spy = jest.spyOn(LocationHandler.prototype, 'getLocationPermission');

    renderer.create(<LocationHandler dispatch={dispatch} />);

    expect(spy).toHaveBeenCalled();
    expect(dispatch).toMatchSnapshot();
  });

  afterEach(() => {
    if (spy) {
      spy.mockClear();
    }
  });
});
