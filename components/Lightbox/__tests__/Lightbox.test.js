import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import Lightbox from '..';

jest.mock('react-native-simple-animators', () => 'Animator');

// Fixes _bezier is not a function bug
jest.useFakeTimers();

describe('Lightbox', () => {
  const handleClose = jest.fn();

  it('renders with minimum required props', () => {
    const component = renderer.create(<Lightbox />);

    expect(component).toMatchSnapshot();
  });

  it('renders with all props', () => {
    const component = renderer.create(
      <Lightbox disableClose>
        <View />
      </Lightbox>,
    );

    expect(component).toMatchSnapshot();
  });

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

  // TODO: It should assign an event listener on mount
});
