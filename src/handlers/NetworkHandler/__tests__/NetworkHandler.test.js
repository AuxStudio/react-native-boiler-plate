import React from 'react';
import renderer from 'react-test-renderer';

import { NetworkHandler } from '..';

/*
 * Mock the NetInfo module
 */
jest.mock('@react-native-community/netinfo', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
});

const NETWORK = {
  online: {
    type: 'wifi',
  },
  offline: {
    type: 'none',
  },
};

describe('NetworkHandler', () => {
  const spies = [];
  const dispatch = jest.fn();

  describe('renders', () => {
    const component = renderer.create(<NetworkHandler dispatch={dispatch} />);

    expect(component).toMatchSnapshot();
  });

  describe('methods', () => {
    it('should handle addNetInfoEventListener', () => {
      const component = renderer.create(<NetworkHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.addNetInfoEventListener();
    });

    it('should handle removeNetInfoEventListener', () => {
      const component = renderer.create(<NetworkHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.removeNetInfoEventListener();
    });

    describe('should handle handleConnectionChange', () => {
      it('when network is offline', () => {
        spies[0] = jest.spyOn(NetworkHandler.prototype, 'setNetworkConnectionInfo');
        spies[1] = jest.spyOn(NetworkHandler.prototype, 'disableNetwork');
        const component = renderer.create(<NetworkHandler dispatch={dispatch} />);
        const instance = component.getInstance();
        const network = NETWORK.offline;

        instance.handleConnectionChange(network);

        expect(spies[0]).toHaveBeenCalledWith(network);
        expect(spies[1]).toHaveBeenCalled();
      });

      it('when network is online', () => {
        spies[0] = jest.spyOn(NetworkHandler.prototype, 'setNetworkConnectionInfo');
        spies[1] = jest.spyOn(NetworkHandler.prototype, 'enableNetwork');
        const component = renderer.create(<NetworkHandler dispatch={dispatch} />);
        const instance = component.getInstance();
        const network = NETWORK.online;

        instance.handleConnectionChange(network);

        expect(spies[0]).toHaveBeenCalledWith(network);
        expect(spies[1]).toHaveBeenCalled();
      });
    });

    it('should handle setNetworkConnectionInfo', () => {
      const component = renderer.create(<NetworkHandler dispatch={dispatch} />);
      const instance = component.getInstance();
      const network = NETWORK.online;

      instance.setNetworkConnectionInfo(network);

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();
    });

    it('should handle disableNetwork', () => {
      const component = renderer.create(<NetworkHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.disableNetwork();

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();
    });

    it('should handle enableNetwork', () => {
      const component = renderer.create(<NetworkHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.enableNetwork();

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();
    });
  });

  describe('lifecycle methods', () => {
    it('should call addNetInfoEventListener in componentDidMount', () => {
      spies[0] = jest.spyOn(NetworkHandler.prototype, 'addNetInfoEventListener');

      renderer.create(<NetworkHandler dispatch={dispatch} />);

      expect(spies[0]).toHaveBeenCalled();
    });

    it('should call  removeNetInfoEventListener in componentWillUnmount', () => {
      spies[0] = jest.spyOn(NetworkHandler.prototype, 'removeNetInfoEventListener');
      const instance = renderer.create(<NetworkHandler dispatch={dispatch} />);

      instance.unmount();

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
