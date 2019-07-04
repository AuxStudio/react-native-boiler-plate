import React from 'react';
import renderer from 'react-test-renderer';

import { LocationHandler } from '..';

describe('LocationHandler', () => {
  const spies = [];
  const dispatch = jest.fn();

  describe('renders', () => {
    it('renders', () => {
      const component = renderer.create(<LocationHandler dispatch={dispatch} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should handle getLocationPermission', () => {
      const component = renderer.create(<LocationHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.getLocationPermission();

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();
    });
  });

  describe('lifecycle methods', () => {
    it('should call getLocationPermission on componentDidMount', () => {
      spies[0] = jest.spyOn(LocationHandler.prototype, 'getLocationPermission');

      renderer.create(<LocationHandler dispatch={dispatch} />);

      expect(spies[0]).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    spies.forEach((spy) => {
      if (spy) {
        spy.mockClear();
      }
    });

    jest.clearAllMocks();
  });
});
