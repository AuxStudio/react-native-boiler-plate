import React from 'react';
import renderer from 'react-test-renderer';

import Lightbox from '..';

jest.mock('react-native-simple-animators', () => 'Animator');

// Fixes _bezier is not a function bug
jest.useFakeTimers();

describe('Lightbox', () => {
  const spies = [];
  const handleClose = jest.fn();

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<Lightbox />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should handle animateOut', () => {
      const component = renderer.create(<Lightbox />);
      const instance = component.getInstance();

      instance.animateOut();

      expect(instance.state.shouldAnimateOut).toBe(true);
    });

    describe('should handle onBack', () => {
      it('with handleClose', () => {
        const component = renderer.create(<Lightbox handleClose={handleClose} />);
        const instance = component.getInstance();

        instance.onBack();

        expect(handleClose).toHaveBeenCalled();
      });

      it('without handleClose', () => {
        const component = renderer.create(<Lightbox />);
        const instance = component.getInstance();

        instance.onBack();

        expect(handleClose).not.toHaveBeenCalled();
      });

      afterEach(() => {
        handleClose.mockClear();
      });
    });
  });

  describe('actions', () => {
    it('should call onBack on close button press', () => {
      // NOTE: Unable to test because of animation
      // FIXME: Work around animation
    });
  });

  afterEach(() => {
    spies.forEach((spy) => {
      if (spy) {
        spy.mockClear();
      }
    });
  });
});
