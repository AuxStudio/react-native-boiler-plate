import React from 'react';
import renderer from 'react-test-renderer';

import { Home } from '..';

jest.mock('react-native-router-flux', () => {
  return {
    Actions: {
      search: jest.fn(),
      pop: jest.fn(),
    },
  };
});

describe('Home', () => {
  let spy;
  const dispatch = jest.fn();

  it('renders with all props', () => {
    renderer.create(<Home dispatch={dispatch} />);
  });

  it('renders with minimum required props', () => {
    renderer.create(<Home />);
  });

  it('should handle navigate', () => {
    spy = jest.spyOn(Home.prototype, 'navigate');
    const component = renderer.create(<Home dispatch={dispatch} />);
    const instance = component.getInstance();

    instance.navigate('search');

    expect(spy).toHaveBeenCalledWith('search');
  });

  afterEach(() => {
    if (spy) {
      spy.mockClear();
    }
  });
});
