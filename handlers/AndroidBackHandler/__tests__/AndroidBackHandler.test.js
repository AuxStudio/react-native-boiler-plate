import React from 'react';
import renderer from 'react-test-renderer';

import { AndroidBackHandler } from '..';

describe('AndroidBackHandler', () => {
  const spies = [];
  const dispatch = jest.fn();
  const anotherScene = 'search';
  const homeScene = '_home';

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<AndroidBackHandler />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    describe('should handle handleBackPress', () => {
      it("when we're on the home scene", () => {
        spies[0] = jest.spyOn(AndroidBackHandler.prototype, 'exitApp');
        const component = renderer.create(<AndroidBackHandler scene={homeScene} />);
        const instance = component.getInstance();

        instance.handleBackPress();

        expect(spies[0]).toHaveBeenCalled();
      });

      it("when we're not on the home scene", () => {
        spies[0] = jest.spyOn(AndroidBackHandler.prototype, 'navigate');
        const component = renderer.create(<AndroidBackHandler scene={anotherScene} />);
        const instance = component.getInstance();

        instance.handleBackPress();

        expect(spies[0]).toHaveBeenCalled();
      });
    });

    it('should handle exitApp', () => {
      const component = renderer.create(<AndroidBackHandler />);
      const instance = component.getInstance();

      instance.exitApp();
    });

    it('should handle navigate', () => {
      const component = renderer.create(<AndroidBackHandler />);
      const instance = component.getInstance();

      instance.navigate();
    });
  });

  describe('lifecycle methods', () => {
    // TODO: Test event listeners
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
