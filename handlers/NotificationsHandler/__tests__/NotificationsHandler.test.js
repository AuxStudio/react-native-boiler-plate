import React from 'react';
import renderer from 'react-test-renderer';

import { NotificationsHandler } from '..';

// NOTE: I have not written tests for the events listeners - struggled with this one
jest.mock('react-native-firebase', () => {
  return {
    notifications: () => {
      return {
        onNotificationDisplayed: jest.fn(),
        onNotification: jest.fn(),
        onNotificationOpened: jest.fn(),
      };
    },
  };
});

describe('NotificationsHandler', () => {
  let spy;
  const dispatch = jest.fn();

  it('renders with all/minimum required props', () => {
    expect(renderer.create(<NotificationsHandler dispatch={jest.fn()} />)).toMatchSnapshot();
  });

  it('calls requestNotificationsPermission on componentDidMount', () => {
    spy = jest.spyOn(NotificationsHandler.prototype, 'requestNotificationsPermission');

    renderer.create(<NotificationsHandler dispatch={dispatch} />);

    expect(spy).toHaveBeenCalled();
    expect(dispatch).toMatchSnapshot();
  });

  // it('updates the store with connection info when WIFI connection', () => {
  //   const component = renderer.create(<NotificationsHandler dispatch={dispatch} />);
  //   const instance = component.getInstance();
  //   const connectionInfo = {
  //     type: 'wifi',
  //     effectiveType: '4g',
  //   };

  //   instance.handleConnectionChange(connectionInfo);
  //   expect(dispatch).toMatchSnapshot();
  // });

  // it('updates the store with connection info and goes online when WIFI connection', () => {
  //   spy = jest.spyOn(NotificationsHandler.prototype, 'enableNetwork');
  //   const component = renderer.create(<NotificationsHandler dispatch={dispatch} />);
  //   const instance = component.getInstance();
  //   const connectionInfo = {
  //     type: 'wifi',
  //     effectiveType: '4g',
  //   };

  //   instance.handleConnectionChange(connectionInfo);
  //   expect(spy).toHaveBeenCalled();
  //   expect(dispatch).toMatchSnapshot();
  // });

  // it('updates the store with connection info and goes offline when no connection', () => {
  //   spy = jest.spyOn(NotificationsHandler.prototype, 'disableNetwork');
  //   const component = renderer.create(<NotificationsHandler dispatch={dispatch} />);
  //   const instance = component.getInstance();
  //   const connectionInfo = {
  //     type: 'none',
  //   };

  //   instance.handleConnectionChange(connectionInfo);
  //   expect(spy).toHaveBeenCalled();
  //   expect(dispatch).toMatchSnapshot();
  // });

  // it('updates the store with connection info and goes offline when 2g connection', () => {
  //   spy = jest.spyOn(NotificationsHandler.prototype, 'disableNetwork');
  //   const component = renderer.create(<NotificationsHandler dispatch={dispatch} />);
  //   const instance = component.getInstance();
  //   const connectionInfo = {
  //     type: 'cellular',
  //     effectiveType: '2g',
  //   };

  //   instance.handleConnectionChange(connectionInfo);
  //   expect(spy).toHaveBeenCalled();
  //   expect(dispatch).toMatchSnapshot();
  // });

  afterEach(() => {
    if (spy) {
      spy.mockClear();
    }
  });
});
