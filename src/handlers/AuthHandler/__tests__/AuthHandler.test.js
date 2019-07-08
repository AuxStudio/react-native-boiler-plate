import React from 'react';
import renderer from 'react-test-renderer';

import { AuthHandler } from '..';

describe('AuthHandler', () => {
  const spies = [];
  const dispatch = jest.fn();

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<AuthHandler dispatch={dispatch} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should handle getAuth', () => {
      const component = renderer.create(<AuthHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.getAuth();

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();
    });
  });

  describe('lifecycle methods', () => {
    it('should call getAuth in componentDidMount', () => {
      spies[0] = jest.spyOn(AuthHandler.prototype, 'getAuth');
      renderer.create(<AuthHandler dispatch={dispatch} />);

      expect(spies[0]).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    spies.forEach((spy) => {
      if (spy) {
        spy.mockClear();
      }
    });
    dispatch.mockClear();
  });
});
