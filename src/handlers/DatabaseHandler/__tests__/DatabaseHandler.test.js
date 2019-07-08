import React from 'react';
import renderer from 'react-test-renderer';

import { DatabaseHandler } from '..';

describe('DatabaseHandler', () => {
  const spies = [];
  const dispatch = jest.fn();

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<DatabaseHandler dispatch={dispatch} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should handle handleSyncData', () => {});
  });

  describe('lifecycle methods', () => {
    it('should call handleSyncData if authenticated in componentDidMount', () => {
      spies[0] = jest.spyOn(DatabaseHandler.prototype, 'handleSyncData');
      renderer.create(<DatabaseHandler dispatch={dispatch} authenticated />);

      expect(spies[0]).toHaveBeenCalled();
    });

    it('should call handleSyncData on new authenticated in componentDidUpdate', () => {
      spies[0] = jest.spyOn(DatabaseHandler.prototype, 'handleSyncData');
      const component = renderer.create(<DatabaseHandler dispatch={dispatch} />);

      component.update(<DatabaseHandler dispatch={dispatch} authenticated />);

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
