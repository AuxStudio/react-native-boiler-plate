import React from 'react';
import renderer from 'react-test-renderer';

import { NotificationsHandler } from '..';

describe('NotificationsHandler', () => {
  const spies = [];
  const dispatch = jest.fn();

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<NotificationsHandler dispatch={dispatch} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should handle requestNotificationsPermission', () => {
      const component = renderer.create(<NotificationsHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.requestNotificationsPermission();

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();
    });
  });

  describe('lifecycle methods', () => {
    it('should handle call requestNotificationsPermission in componentDidMount', () => {
      spies[0] = jest.spyOn(NotificationsHandler.prototype, 'requestNotificationsPermission');
      renderer.create(<NotificationsHandler dispatch={dispatch} />);

      expect(spies[0]).toHaveBeenCalled();
    });

    // NOTE: I am not testing the event listener calls here
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
