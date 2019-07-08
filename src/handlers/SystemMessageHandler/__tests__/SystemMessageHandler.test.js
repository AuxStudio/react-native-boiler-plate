import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import { SystemMessageHandler } from '..';

jest.mock('react-native-snackbar', () => {
  return {
    show: jest.fn(),
    hide: jest.fn(),
  };
});

describe('SystemMessageHandler', () => {
  const spies = [];
  const dispatch = jest.fn();
  const children = <View />;

  describe('renders', () => {
    it('renders', () => {
      const component = renderer.create(<SystemMessageHandler>{children}</SystemMessageHandler>);

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should handle showSnackbar', () => {
      const component = renderer.create(<SystemMessageHandler>{children}</SystemMessageHandler>);
      const instance = component.getInstance();

      instance.showSnackbar();
    });

    it('should handle resetError', () => {
      const component = renderer.create(
        <SystemMessageHandler dispatch={dispatch}>{children}</SystemMessageHandler>,
      );
      const instance = component.getInstance();

      instance.resetError();

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();
    });
  });

  describe('lifecycle methods', () => {
    it('should call showSnackbar and resetError if systemMessage changed in componentDidUpdate', (done) => {
      spies[0] = jest.spyOn(SystemMessageHandler.prototype, 'showSnackbar');
      const component = renderer.create(
        <SystemMessageHandler dispatch={dispatch} systemMessage="Something went wrong">
          <View />
        </SystemMessageHandler>,
      );
      const instance = component.getInstance();

      component.update(
        <SystemMessageHandler dispatch={dispatch} systemMessage="Same same, but different">
          <View />
        </SystemMessageHandler>,
      );

      setTimeout(() => {
        expect(spies[0]).toHaveBeenCalled();
        expect(dispatch).toMatchSnapshot();

        done();
      }, instance.snackbarDuration);
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
