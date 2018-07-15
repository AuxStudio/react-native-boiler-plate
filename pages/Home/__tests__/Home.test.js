import React from 'react';
import renderer from 'react-test-renderer';

import { Home } from '..';

describe('Home', () => {
  const spies = [];
  const dispatch = jest.fn();

  it('renders with all props', () => {
    renderer.create(<Home dispatch={dispatch} />);
  });

  it('renders with minimum required props', () => {
    renderer.create(<Home />);
  });

  afterEach(() => {
    spies.forEach((spy) => {
      if (spy) {
        spy.mockClear();
      }
    });
  });
});
