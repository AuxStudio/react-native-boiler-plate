import React from 'react';
import renderer from 'react-test-renderer';

import { AuthHandler } from '..';

describe('AuthHandler', () => {
  let spy;
  const dispatch = jest.fn();

  it('renders with all/minimum required props', () => {
    expect(renderer.create(<AuthHandler dispatch={jest.fn()} />)).toMatchSnapshot();
  });

  it('calls getAuth on componentDidMount', () => {
    spy = jest.spyOn(AuthHandler.prototype, 'getAuth');

    renderer.create(<AuthHandler dispatch={dispatch} />);

    expect(spy).toHaveBeenCalled();
    expect(dispatch).toMatchSnapshot();
  });

  afterEach(() => {
    if (spy) {
      spy.mockClear();
    }
  });
});
